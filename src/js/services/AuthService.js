'use strict';

angular.module('app')
    .factory('AuthService', ['$http', '$q', '$window', '$localStorage', function ($http, $q, $window, $localStorage) {
        var user;
        var cachedToken;
        var baseAPI = 'http://neadcom.wwwss24.a2hosted.com/343TruckingAPI/api/v1/';

        function getToken () {
            if (!cachedToken) {
                cachedToken = $localStorage.userInfo;
            }

            return cachedToken;
        }

        return {
            login: function (user) {
                var deferred = $q.defer();

                $http({
                    method: 'POST',
                    url: baseAPI + 'account/login',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: user
                }).then(function (response) {
                    console.log(response);

                    user = {
                        token: response.data.jwt
                    };

                    $localStorage.userInfo = user;

                    deferred.resolve(user);
                }, function (error) {
                    deferred.resolve(error);
                });

                return deferred.promise;
            },
            register: function (newUser) {
                return $http({
                    method: 'POST',
                    url: baseAPI + 'account/register',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: newUser
                }).then(function (response) {
                    return response;
                });
            },
            isUserAuthenticated: function () {
                return !!getToken();
            },
            getUserInfo: function () {
                return user;
            },
            logout: function () {
                var deferred = $q.defer();

                $http({
                    method: 'POST',
                    url: baseAPI + 'account/logout',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: user
                }).then(function (response) {
                    if (response.data.status === 'OK') {
                        delete $localStorage.userInfo;
                        cachedToken = null;
                        user = null;

                        deferred.resolve(response);
                    }
                }, function (error) {
                    deferred.resolve(error);
                });

                return deferred.promise;
            },
            getToken: getToken
        };
    }]);