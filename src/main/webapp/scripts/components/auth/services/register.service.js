'use strict';

angular.module('demoApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


