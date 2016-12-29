'use strict';

app.controller('LoginCtrl', ['$rootScope', '$scope', '$http', '$state', '$localStorage', 'AuthService', function ($rootScope, $scope, $http, $state, $localStorage, AuthService) {
    /*$localStorage.$default({
        user: {
            anonymous: true
        }
    });


    $scope.authError = null;
    $scope.login = function () {
        $scope.authError = null;
        // Try to login
        $http.post('api/login', {email: $scope.user.email, password: $scope.user.password})
            .then(function (response) {
                if (!response.data.user) {
                    $scope.authError = 'Email or Password not right';
                } else {
                    $state.go('app.dashboard-v1');
                }
            }, function (x) {
                $scope.authError = 'Server Error';
            });
    };

    $scope.signIn = function () {
        Auth.signIn($scope.user).then(function () {
            $localStorage.user = $scope.user;
            return UserProfile.$$state.value.$refresh();
        }).then(function () {
            $state.go('app.dashboard');
        });
    };*/

    $scope.user = {
        email: 'arsenbabajanyan95@gmail.com',
        password: 6951600
    };

    $scope.login = function () {
        AuthService.login($scope.user).then(function (response) {
            console.log(AuthService.isUserAuthenticated());

            if(AuthService.isUserAuthenticated()) {

                $rootScope.isUserAuthenticated = AuthService.isUserAuthenticated();

                $state.go('app.dashboard');
            } else {
                console.log(response.data.message);

                $scope.user.username = '';
                $scope.user.password = '';
            }
        }, function (response) {
            console.log('error:' + response.data.message);
        });
    };
}]);
