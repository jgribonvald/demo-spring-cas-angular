'use strict';
/**
 * Created by jgribonvald on 17/02/15.
 */
var relogState = {};
angular.module('demoApp')
    .controller('LoginModalController', function($rootScope, $scope, $window, $state, $q, Principal) {

        function windowOpenCleanup(state) {
            try {
                if (state.listener) $window.removeEventListener("message", state.listener);
                if (state.window) state.window.close();
                if ($rootScope.modalOpened) $rootScope.modalOpened.close();
            } catch (e) {console.log(e)}
        }

        function onmessage(e) {
            if (typeof e.data !== "string") return;
            var m = e.data.match(/^loggedUser=(.*)$/);
            if (!m) return;

            var user = angular.fromJson(m[1]);
            windowOpenCleanup(relogState);
            Principal.identity(true)
            // use of transitionTO to force reload of pages after login it's needed
            if ($rootScope.returnToState) {
                $state.transitionTo($rootScope.returnToState, $rootScope.returnToStateParams, {reload: true});
            } else if ($rootScope.toState) {
                $state.transitionTo($rootScope.toState.name, $rootScope.toStateParams, {reload: true});
            } else {
                $state.transitionTo('home', {}, {reload: true});
            }
            //return user;
        }

        $scope.relog = function () {
            windowOpenCleanup(relogState);
            relogState.listener = onmessage;
            $window.addEventListener("message", onmessage);
            relogState.window = $window.open('app/login?postMessage');
        }

    });
