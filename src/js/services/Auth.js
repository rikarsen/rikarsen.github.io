'use strict';

angular.module('app')
    .service('Auth', ['$http', function ($http) {
        this.getProfile = function () {
            return $http.get('api/login');
        };

        this.signIn = function (user) {
            return $http.get('api/login');
        };
    }]);