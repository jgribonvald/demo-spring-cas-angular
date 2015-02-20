'use strict';

angular.module('demoApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('filtered', {
                parent: 'protected',
                url: 'filtered',
                data: {
                    roles: ['ROLE_ADMIN']
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/protected/filtered/filtered.html',
                        controller: 'FilteredController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('filtered');
                        return $translate.refresh();
                    }]
                }
            }).state('filtered2', {
                parent: 'protected',
                url: '/filtered2',
                data: {
                    requireLogin: false,
                    roles: ['ROLE_USER']
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/protected/filtered/filtered.html',
                        controller: 'FilteredController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('filtered');
                        return $translate.refresh();
                    }]
                }
            });
    });
