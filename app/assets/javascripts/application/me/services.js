(function (angular) {
  'use strict';

  angular
      .module('application.me')
      .factory('Me', Me);

  /*@ngInject*/
  function Me($http, DSCacheFactory, API_CONSTANTS) {
    var cache = DSCacheFactory.get('ApplicationCache');

    return {
      index: function () {
        return $http({
          cache: cache,
          method: 'GET',
          url: API_CONSTANTS.ME_BASE
        });
      },

      update: function (data) {
        cache.remove(API_CONSTANTS.ME_BASE);

        return $http({
          method: 'PUT',
          url: API_CONSTANTS.ME_BASE,
          data: data
        });
      },

      password: function (data) {
        cache.remove(API_CONSTANTS.ME_BASE);

        return $http({
          method: 'PUT',
          url: API_CONSTANTS.ME_BASE + '/password',
          data: data
        });
      }
    }
  }

}(window.angular));

