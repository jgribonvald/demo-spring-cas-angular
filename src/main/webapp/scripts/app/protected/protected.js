'use strict';

angular.module('demoApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('protected', {
                parent: 'site',
                url: '/',
                data: {
                    requireLogin: true,
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/protected/protected.html',
                        controller: 'ProtectedController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('protected');
                        return $translate.refresh();
                    }]
                }
            });
    });
