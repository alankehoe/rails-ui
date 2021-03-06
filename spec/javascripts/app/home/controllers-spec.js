'use strict';

describe('Module: application.home', function () {
  var $httpBackend;
  
  beforeEach(function () {
    module('application');

    inject(function (_$httpBackend_, DSCacheFactory) {
      var cache = DSCacheFactory.get('ApplicationCache');
      cache.disable();

      $httpBackend = _$httpBackend_
    });
    
    var me = {
      "id": "c6878f77-c886-4a6b-9fc8-b338f8edf266",
      "username": "admin",
      "email": "alankehoe111@gmail.com",
      "admin": true,
      "last_seen": "2014-11-27T09:29:37.806Z",
      "name": "Admin",
      "avatar": {
        "avatar": {
          "url": null,
          "thumb": {
            "url": null
          }
        }
      },
      "gravatar": "http://www.gravatar.com/avatar/cdf41ba70362ec8d20ef50d0a45a4217?d=identicon&s=200",
      "sign_in_count": 3,
      "current_sign_in_at": "2014-11-27T09:28:00.673Z",
      "last_sign_in_at": "2014-11-27T09:27:51.847Z",
      "current_sign_in_ip": "127.0.0.1",
      "last_sign_in_ip": "127.0.0.1",
      "skype": null,
      "twitter": "@_alankehoe",
      "facebook": null,
      "linkedin": null,
      "created_at": "2014-11-24T13:22:32.662Z",
      "updated_at": "2014-11-27T09:29:37.810Z"
    };

    $httpBackend.whenGET('/api/v1/me').respond(me);
  });

  describe('Controller: HomeCtrl', function () {
    var $scope, ctrl;
    var Me;

    beforeEach(function () {
      inject(function (_$rootScope_, _$controller_, _Me_) {
        $scope = _$rootScope_.$new();
        Me = _Me_;

        ctrl = _$controller_('HomeCtrl', {
          $scope: $scope,
          Me: Me
        });
      });

      $httpBackend.flush();
    });

    it('should pass a sanity test', function () {
      expect(true).toEqual(true);
    });

    it('should contain all the current user on instantiation', function () {
      expect($scope.me.id).toBe('c6878f77-c886-4a6b-9fc8-b338f8edf266');
    });
  });
});