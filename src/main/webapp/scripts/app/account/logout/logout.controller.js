'use strict';

angular.module('demoApp')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
