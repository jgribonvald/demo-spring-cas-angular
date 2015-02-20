'use strict';

angular.module('demoApp')
    .controller('LoginController', function ($rootScope, $scope, $state, $q, Auth) {
        $scope.user = {};
        $scope.errors = {};

        $scope.login = function () {
            //var deferred = $q.defer;
            Auth.login().then(function (data) {
                $scope.authenticationError = false;
                if (!$rootScope.returnToState) {
                    $state.transitionTo('home', {}, {reload: true, inherit: false, notify: true});
                } else {
                    $state.transitionTo($rootScope.returnToState.name, $rootScope.returnToStateParams, {reload: true, inherit: false, notify: true });
                }
                //deferred.resolve(data);
            }).catch(function (err) {
                $scope.authenticationError = true;
                //deferred.reject(err);
            });
            //return deferred.promise;
        };
    });
