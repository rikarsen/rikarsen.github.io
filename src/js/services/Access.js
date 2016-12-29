'use strict';

angular.module('app')
    .factory('Access', ['$q', 'UserProfile', function ($q, UserProfile) {
        var Access = {
            OK: 200,
            UNAUTHORIZED: 401,
            FORBIDDEN: 403,
            hasRole: function (role) {
                return UserProfile.then(function (userProfile) {
                    if (userProfile.$hasRole(role)) {
                        return Access.OK;
                    } else if (userProfile.$isAnonymous()) {
                        return $q.reject(Access.UNAUTHORIZED);
                    } else {
                        return $q.reject(Access.FORBIDDEN);
                    }
                });
            },
            hasAnyRole: function (roles) {
                return UserProfile.then(function (userProfile) {
                    if (userProfile.$hasAnyRole(roles)) {
                        return Access.OK;
                    } else if (userProfile.$isAnonymous()) {
                        return $q.reject(Access.UNAUTHORIZED);
                    } else {
                        return $q.reject(Access.FORBIDDEN);
                    }
                });
            },
            isAnonymous: function () {
                return UserProfile.then(function (userProfile) {
                    if (userProfile.$isAnonymous()) {
                        return Access.OK;
                    } else {
                        return $q.reject(Access.FORBIDDEN);
                    }
                });
            },
            isAuthenticated: function () {
                return UserProfile.then(function (userProfile) {
                    if (userProfile.$isAuthenticated()) {
                        return Access.OK;
                    } else {
                        return $q.reject(Access.UNAUTHORIZED);
                    }
                });
            }
        };

        return Access;
    }]);