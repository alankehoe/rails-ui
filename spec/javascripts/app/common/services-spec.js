'use strict';

describe('Module: application.common', function () {

  beforeEach(function () {
    module('application');
  });

  describe('Factory: Store', function () {
    var Store;

    beforeEach(function () {
      delete localStorage['test'];

      inject(function (_Store_) {
        Store = _Store_;
      });
    });

    it('Should place an object in local storage', function () {
      Store.set('test', {name: 'alan'});
      expect(localStorage['test']).toBeDefined();
    });

    it('Should get an object from local storage', function () {
      Store.set('test', {name: 'alan'});
      expect(Store.get('test')).toBeObject();
    });

    it('Should check the presence on an object in local storage', function () {
      Store.set('test', {name: 'alan'});
      expect(Store.has('test')).toBeTrue();
    });

    it('Should remove an object from local storage', function () {
      Store.set('test', {name: 'alan'});
      Store.empty('test');
      expect(Store.has('test')).toBeFalse();
    });
  });
});