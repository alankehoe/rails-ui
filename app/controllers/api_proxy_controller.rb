class ApiProxyController < ApplicationController
  before_filter :check_session

  def proxy
    proxy_response = access_token.send request_method.downcase.to_sym,
                                 request_path, 
                                 params: request_params
    response.headers = proxy_response.headers
    render json: proxy_response.body, status: proxy_response.status
  rescue OAuth2::Error => error
    proxy_response = error.response
    response.headers = proxy_response.headers
    render json: proxy_response.body, status: proxy_response.status
  end

  private

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