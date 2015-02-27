(function (angular) {
  'use strict';

  angular
      .module('application', [
        'ngRoute',
        'ngResource',
        'ngAnimate',
        'ui.bootstrap',
        'angularMoment',
        'angularFileUpload',
        'angular-data.DSCacheFactory',
        'application.common',
        'application.me',
        'application.users',
        'application.home'
      ]);

}(window.angular));
