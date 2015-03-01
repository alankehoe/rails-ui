class SessionController < ApplicationController
  def login
    access_token = client.password.get_token params[:username], 
                                             params[:password]
    session[:oauth] = access_token.to_hash
    render json: { message: 'ok' }
  rescue OAuth2::Error
    render json: { error: 'wrong_credentials' }, status: :unauthorized
  rescue Faraday::SSLError
    render json: { error: 'invalid_cert' }, status: :unauthorized
  end

  def logout
    reset_session
    render json: { message: 'ok' }
  end
end