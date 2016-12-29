'use strict';

app.controller('SigninFormController', ['$scope', '$http', '$state', '$localStorage', 'Auth', 'UserProfile', function($scope, $http, $state, $localStorage, Auth, UserProfile) {
    $localStorage.$default({
        user: {
            anonymous: true
        }
    });

    $scope.user = {
        email: 'dsf@f.hhfg',
        password: 'dsadas',
        anonymous: false
    };
    $scope.authError = null;
    $scope.login = function() {
        $scope.authError = null;
        // Try to login
        $http.post('api/login', {email: $scope.user.email, password: $scope.user.password})
            .then(function(response) {
                if ( !response.data.user ) {
                    $scope.authError = 'Email or Password not right';
                }else{
                    $state.go('app.dashboard-v1');
                }
            }, function(x) {
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
    };
}])
;
