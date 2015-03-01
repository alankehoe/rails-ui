# This is the big daddy of the controllers and all controllers
# inherit from it, it has some basic functionality common to all the
# controller layer
class ApplicationController < ActionController::Base
  include Application::Oauth
  
  protect_from_forgery

  rescue_from ActionController::InvalidAuthenticityToken do
    render json: { :error => 'missing_csrf' }, status: :bad_request
  end

  def handle_unverified_request
    super
    raise ActionController::InvalidAuthenticityToken
  end

  def handle_missing_session
    render json: { :error => 'no_session' }, status: :unauthorized
  end
end
