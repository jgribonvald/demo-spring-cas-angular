'use strict';

angular.module('demoApp')
    .controller('FilteredController', function ($scope, Principal, $state) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.role = $state.current.data.roles;
            $scope.isAuthenticated = Principal.isAuthenticated;
        });
    });
