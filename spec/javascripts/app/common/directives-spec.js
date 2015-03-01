'use strict';

describe('Module: application.common', function () {
  beforeEach(function () {
    module('application');
    
    inject(function (_$httpBackend_, DSCacheFactory) {
      var cache = DSCacheFactory.get('ApplicationCache');
      cache.disable();
    });
  });

  describe('Directive: navbar', function () {
    var $httpBackend, $scope, $compile, Session, Me;

    beforeEach(function () {
      inject(function (_$httpBackend_, _$rootScope_, _$compile_, _Session_, _Me_) {
        $httpBackend = _$httpBackend_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
        Session = _Session_;
        Me = _Me_;
      });

      $httpBackend.expectGET('/api/v1/me').respond(
          {
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
          }
      );
      
      $httpBackend.whenGET('/assets/application/common/partials/navbar.html').respond(200);
    });

    it('should render the template correctly', function () {
      var template = $compile("<navbar></navbar>")($scope);
      $scope.$digest();
      $httpBackend.flush();

      expect(template.html()).toContain('Application');
    });

    it('should contain the current user in the template', function () {
      var template = $compile("<navbar></navbar>")($scope);
      $scope.$digest();
      $httpBackend.flush();

      expect($scope.me.id).toBe('c6878f77-c886-4a6b-9fc8-b338f8edf266');
      expect(template.html()).toContain($scope.me.name);
    })
  });
});