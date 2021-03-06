'use strict';

angular.module('app')
    .controller('AppCtrl', ['$scope', '$window', '$state', '$http', function ($scope, $window, $state, $http) {
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        if(isIE){ angular.element($window.document.body).addClass('ie');}
        if(isSmartDevice( $window ) ){ angular.element($window.document.body).addClass('smart')}

        $scope.app = {
            name: 'COC Clan manager',
            version: '1.0.0',
            color: {
                primary: '#7266ba',
                info:    '#23b7e5',
                success: '#27c24c',
                warning: '#fad733',
                danger:  '#f05050',
                light:   '#e8eff0',
                dark:    '#3a3f51',
                black:   '#1c2b36'
            },
            settings: {
                themeID: 1,
                navbarHeaderColor: 'bg-black',
                navbarCollapseColor: 'bg-white-only',
                asideColor: 'bg-black',
                headerFixed: true,
                asideFixed: true,
                asideFolded: false,
                asideDock: false,
                container: false
            }
        };


        // $http.get('http://localhost:8888/rikarsen.github.io/src/api/users').success(function (data) {
        //     console.log(data);
        // });


        function isSmartDevice($window) {
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }
    }]);
