'use strict';

angular.module('demoApp')
    .controller('MainController', function ($scope, Principal, $state) {
        Principal.identity().then(function(account) {
            $scope.isAuthenticated = Principal.isAuthenticated;
            $scope.account = account;
        })
    });
