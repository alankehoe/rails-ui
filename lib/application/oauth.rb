module Application
  module Oauth
    # Returns an OAuth client configured from settings found in application.yml
    def client
      @client ||= OAuth2::Client.new Settings['api']['oauth_client_id'],
                                     Settings['api']['oauth_client_secret'],
                                     site: Settings['api']['base_url'],
                                     token_url: Settings['api']['oauth_token_url']
    end

    # Checks if there is a valid session, if there is the oauth credentials are taken from 
    # the session. if the access token is expired this method will refresh the token 
    # and continue on.
    def access_token
      return false unless session[:oauth]
      access_token = OAuth2::AccessToken.from_hash client, session[:oauth].dup
      if access_token.expired?
        access_token = OAuth2::AccessToken.from_hash(client, session[:oauth].dup).refresh!
        session[:oauth] = access_token.to_hash
      end
      @access_token ||= access_token
    end
  end
end