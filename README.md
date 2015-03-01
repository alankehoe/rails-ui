=========

[![Build Status](https://travis-ci.org/alankehoe/rails-ui.svg?branch=master)](https://travis-ci.org/alankehoe/rails-ui)
[![Dependency Status](https://gemnasium.com/alankehoe/rails-ui.svg)](https://gemnasium.com/alankehoe/rails-ui)

# Getting started

## 1. System setup
   
    # Install package dependencies
    brew install phantomjs

## 2. Ruby

    # Install rvm & ruby
    \curl -sSL https://get.rvm.io | bash -s stable
    rvm install ruby-2.0.0-p481
    
## 3. Node

    # Install nvm & node
    curl https://raw.githubusercontent.com/creationix/nvm/v0.16.1/install.sh | bash
    nvm install 0.10
    nvm alias default 0.10

## 4. Contributing

    # Install gems
    bundle install
    
    # Install node package
    npm install
    
    # Get bower assets
    bundle exec rake bower:install

## 5. Run specs
    
    # JavaScript specs
    bundle exec rake spec:javascript

## 7. Run the application

    # Start the rails server
    foreman start