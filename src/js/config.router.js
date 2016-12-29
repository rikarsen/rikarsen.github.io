'use strict';

angular.module('app')
    .run(['$rootScope', 'Access', '$state', '$stateParams', function ($rootScope, Access, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (error == Access.UNAUTHORIZED) {
                $state.go('access.signIn');
            } else if (error == Access.FORBIDDEN) {
                console.log('FORBIDDEN');
            }
        });
    }])
    .config(['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG', function ($stateProvider, $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {
        $urlRouterProvider.otherwise('/access/signIn');

        $stateProvider
            .state('app', {
                abstract: true,
                url: '/app',
                templateUrl: 'tpl/app.html'
            })
            .state('app.dashboard', {
                url: '/dashboard',
                templateUrl: 'tpl/dashboard.html',
                resolve: {
                    access: ['Access', function (Access) { return Access.isAuthenticated(); }]
                }
            })
            .state('access', {
                abstract: true,
                url: '/access',
                template: '<div ui-view class="fade-in-right-big smooth"></div>'
            })
            .state('access.signIn', {
                url: '/signIn',
                templateUrl: 'tpl/signIn.html',
                resolve: load(['js/controllers/signIn.js'], 'isAnonymous')
            });

        function load(srcs, accessFn, callback) {
            return {
                access: ['Access', function (Access) {
                    if(accessFn == 'isAnonymous') {
                        return Access.isAnonymous();
                    }
                }],
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
