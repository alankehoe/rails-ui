class ApiProxyController < ApplicationController
  before_filter :check_session

  def proxy
    response = access_token.send request_method.downcase.to_sym, request_path, params: request_params
    self.response.headers = response.headers
    render json: response.body, status: response.status
  rescue OAuth2::Error => error
    response = error.response
    self.response.headers = response.headers
    render json: response.body, status: response.status
  rescue Faraday::ConnectionFailed
    render json: {error: 'service_unavailable'}, status: 502
  end

  private

  def access_token
    return false unless session[:oauth]
    access_token = OAuth2::AccessToken.from_hash client, session[:oauth].dup
    if access_token.expired?
      access_token = OAuth2::AccessToken.from_hash(client, session[:oauth].dup).refresh!
      session[:oauth] = access_token.to_hash
    end
    @access_token ||= access_token
  end

  def check_session
    handle_missing_session unless access_token
  end

  def request_path
    request.env['PATH_INFO']
  end

  def request_method
    request.env['REQUEST_METHOD']
  end

  def request_params
    params[:api_proxy].dup if params[:api_proxy]
  end
end