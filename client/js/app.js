'use strict';

angular.module('nggl', ['ngCookies', 'ngRoute', 'ngJustGage', 'ngDateTime'])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider, ngDateTime) {

    var access = routingConfig.accessLevels;

    $routeProvider.when('/',
        {
            templateUrl:    '/partials/home.html',
            controller:     'HomeCtrl',
            access:         access.user
        });
    $routeProvider.when('/login',
        {
            templateUrl:    '/partials/login.html',
            controller:     'LoginCtrl',
            access:         access.anon
        });
    $routeProvider.when('/register',
        {
            templateUrl:    'partials/register.html',
            controller:     'RegisterCtrl',
            access:         access.anon
        });
    $routeProvider.when('/private',
        {
            templateUrl:    '/partials/private.html',
            controller:     'PrivateCtrl',
            access:         access.user
        });
    $routeProvider.when('/jinliao',
        {
            templateUrl:    '/partials/private.jinliao.html',
            controller:     'JinliaoCtrl',
            access:         access.user
        });
    $routeProvider.when('/chuzha',
        {
            templateUrl:    '/partials/private.chuzha.html',
            controller:     'ChuzhaCtrl',
            access:         access.user
        });
    $routeProvider.when('/yinfengji',
        {
            templateUrl:    '/partials/private.yinfengji.html',
            controller:     'YinfengjiCtrl',
            access:         access.user
        });   
    $routeProvider.when('/shuibeng',
        {
            templateUrl:    '/partials/private.shuibeng.html',
            controller:     'ShuibengCtrl',
            access:         access.user
        });   
    $routeProvider.when('/wendu',
        {
            templateUrl:    '/partials/private.wendu.html',
            controller:     'WenduCtrl',
            access:         access.user
        });
     $routeProvider.when('/gufengji',
        {
            templateUrl:    '/partials/private.gufengji.html',
            controller:     'GufengjiCtrl',
            access:         access.user
        });   
    $routeProvider.when('/globalconfig',
        {
            templateUrl:    '/partials/private.config.html',
            controller:     'GlobalconfigCtrl',
            access:         access.user
        });   
    $routeProvider.when('/alarms',
        {
            templateUrl:    '/partials/private.alarms.html',
            controller:     'AlarmsCtrl',
            access:         access.user
        });   
    $routeProvider.when('/admin',
        {
            templateUrl:    '/partials/admin.html',
            controller:     'AdminCtrl',
            access:         access.admin
        });
    $routeProvider.when('/404',
        {
            templateUrl:    '/partials/404.html',
            access:         access.public
        });
    $routeProvider.otherwise({redirectTo:'/404'});

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(function($q, $location) {
        return {
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/login');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        }
    });


    

}])

    .run(['$rootScope', '$location', '$http', 'Auth', function ($rootScope, $location, $http, Auth) {    
        $rootScope.accessors = {
            getId: function(row) {
            return row._id
            }
        }
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.error = null;
			 console.log('next access' + next.access.bitMask);
            if (!Auth.authorize(next.access)) {
                if(Auth.isLoggedIn()) $location.path('/');
                else                  $location.path('/login');
            }
        });

    }]);