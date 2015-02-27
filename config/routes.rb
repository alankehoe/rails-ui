Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)

  get '/' => 'layouts#index', as: 'root'
  post '/session/login' => 'session#login'
  get '/session/logout' => 'session#logout'
  match '/*a', to: 'api_proxy#proxy', via: [:get, :post, :put, :delete]
end
