(function (angular) {
  'use strict';

  angular
      .module('application')
      .run(setupApplicationCache);

  /*@ngInject*/
  function setupApplicationCache(DSCacheFactory) {
    DSCacheFactory('ApplicationCache', {
      maxAge: 900000, // Items added to this cache expire after 15 minutes.
      cacheFlushInterval: 6000000, // This cache will clear itself every hour.
      deleteOnExpire: 'aggressive', // Items will be deleted from this cache right when they expire.
      storageMode: 'localStorage' // Use localStorage for cache
    });
  }

}(window.angular));
