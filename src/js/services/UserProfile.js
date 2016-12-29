'use strict';

angular.module('app')
    .factory('UserProfile', ['Auth', '$localStorage', function (Auth, $localStorage) {
        var userProfile = {};

        $localStorage.$default({
            user: {
                anonymous: true
            }
        });

        var fetchUserProfile = function () {
            return Auth.getProfile().then(function (response) {
                response.data = $localStorage.user;

                userProfile = {};

                return angular.extend(userProfile, response.data, {
                    $refresh: fetchUserProfile,

                    $hasRole: function (role) {
                        return userProfile.roles.indexOf(role) >= 0;
                    },

                    $hasAnyRole: function (roles) {
                        return !!userProfile.roles.filter(function (role) {
                            return roles.indexOf(role) >= 0;
                        }).length;
                    },

                    $isAnonymous: function () {
                        return userProfile.anonymous;
                    },

                    $isAuthenticated: function () {
                        return !userProfile.anonymous;
                    }
                });
            });
        };

        return fetchUserProfile();
    }]);