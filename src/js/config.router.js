'use strict';

angular.module('app')
    .run(['$rootScope', 'AuthService', '$state', '$stateParams', function ($rootScope, AuthService, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        if(AuthService.isUserAuthenticated()) {
            $rootScope.isUserAuthenticated = AuthService.isUserAuthenticated();
        }
    }])
    .config(['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG', function ($stateProvider, $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {
        $urlRouterProvider.otherwise('/app/dashboard');

        $stateProvider
            .state('app', {
                abstract: true,
                url: '/app',
                templateUrl: 'tpl/app.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('app.dashboard', {
                url: '/dashboard',
                templateUrl: 'tpl/dashboard.html'
            })
            .state('access', {
                abstract: true,
                url: '/access',
                template: '<div ui-view class="fade-in-right-big smooth"></div>'
            })
            .state('access.login', {
                url: '/login',
                templateUrl: 'tpl/login.html',
                resolve: load(['js/controllers/loginCtrl.js'])
            })
            .state('access.404', {
                url: '/404',
                templateUrl: 'tpl/404.html'
            });

        function loginRequired($q, AuthService) {
            var deffered = $q.defer();

            if(AuthService.isUserAuthenticated()) {
                deffered.resolve();
            } else {
                $state.go('access.login');
            }

            return deffered.promise;
        }

        function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q', function ($ocLazyLoad, $q) {
                    var deferred = $q.defer();
                    var promise  = false;
                    srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                    if(!promise){
                        promise = deferred.promise;
                    }
                    angular.forEach(srcs, function(src) {
                        promise = promise.then( function(){
                            if(JQ_CONFIG[src]){
                                return $ocLazyLoad.load(JQ_CONFIG[src]);
                            }
                            angular.forEach(MODULE_CONFIG, function(module) {
                                if( module.name == src){
                                    name = module.name;
                                }else{
                                    name = src;
                                }
                            });
                            return $ocLazyLoad.load(name);
                        } );
                    });
                    deferred.resolve();
                    return callback ? promise.then(function(){ return callback(); }) : promise;
                }]
            }
        }
    }]);
