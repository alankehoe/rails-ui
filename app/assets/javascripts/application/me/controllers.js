(function (angular) {
  'use strict';

  angular
      .module('application.me')
      .controller('MeUpdateCtrl', MeUpdateCtrl)
      .controller('MeUpdatePasswordCtrl', MeUpdatePasswordCtrl);

  /*@ngInject*/
  function MeUpdateCtrl($scope, $upload, Me) {
    Me.index().then(function (success) {
      $scope.me = success.data;
    });

    $scope.update = function () {
      Me.update({user: $scope.me}).then(function (success) {
        $scope.me = success.data;
        $.growl.notice({message: 'Your profile settings have been updated successfully'});
      }, function (error) {
        _.each(error.data.messages, function (message) {
          $.growl.error({title: "Error", message: message});
        });
      });
    };

    $scope.onFileSelect = function ($files) {
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        $scope.upload = $upload.upload({
          url: 'api/v1/me/avatar',
          method: 'PUT',
          file: file
        }).progress(function (evt) {
          var progress = parseInt(100.0 * evt.loaded / evt.total);
          console.log(progress);
        }).success(function (data) {
          $scope.me = data.data;
          $.growl.notice({message: 'Your profile picture has been updated successfully'});
        }).error(function (response) {
          _.each(response.data.messages, function (message) {
            $.growl.error({title: "Error", message: message});
          });
        });
      }
    };
  }

  /*@ngInject*/
  function MeUpdatePasswordCtrl($scope, Me) {
    Me.index().then(function (response) {
      $scope.me = response.data;
    });

    $scope.update = function () {
      Me.password({password: 'password', user: $scope.me}).then(function (response) {
        $scope.me = response.data;
        $.growl.notice({message: 'Your password has been successfully updated'});
      }, function (response) {
        _.each(response.data.messages, function (message) {
          $.growl.error({title: "Error", message: message});
        });
      });
    };
  }

}(window.angular));
