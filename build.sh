#!/bin/bash

echo "Getting dependencies"
npm install
bundle install

echo "Linting ruby code"
bundle exec rubocop --format fuubar

echo "Linting JS code"
grunt jshint

echo "Running JS specs"
bundle exec rake spec:javascript
