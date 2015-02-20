'use strict';

angular.module('demoApp')
    .factory('AuthServerProvider', function loginService($rootScope, $http, localStorageService, $window, $modal, Principal, $q) {
        return {
            login: function(credentials) {
                /*var data = 'j_username=' + encodeURIComponent(credentials.username) +
                    '&j_password=' + encodeURIComponent(credentials.password) +
                    '&_spring_security_remember_me=' + credentials.rememberMe + '&submit=Login';
                return $http.post('api/authentication', data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).success(function (response) {
                    localStorageService.set('token', $window.btoa(credentials.username + ':' + credentials.password));
                    return response;
                });*/
                return $http.jsonp('app/login?callback=JSON_CALLBACK')
                    .success(function (response, status) {
                        //console.log("try login with callback request " + status);
                        //Principal.authenticate(response.data);
                        return response;
                    }).error(function () {
                        // console.log("simple login failed - start window.open + postMessage");
                        $rootScope.modalOpened = $modal.open({ templateUrl: 'scripts/app/account/login/loginModal.html', controller: 'LoginModalController', backdrop: false });
                        return $q.reject();
                    });
            },
            logout: function() {
                // logout from the server
                $http.post('api/logout').success(function (response) {
                    localStorageService.clearAll();
                    // to get a new csrf token call the api
                    $http.get('api/account');
                    return response;
                });
            },
            getToken: function () {
                var token = localStorageService.get('token');
                return token;
            },
            hasValidToken: function () {
                var token = this.getToken();
                return !!token;
            }
        };
    });
