(function(){
    'use strict';
    
    angular
        .module('EOI', ['ngRoute', 'rzModule']).config(config);
    
    config.$inject = ['$routeProvider', '$locationProvider'];
    
    function config($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                controller : 'HomeController',
                templateUrl : 'views/films.html'
        })
            .when('/search', {
                controller : 'SearchController',
                templateUrl : 'views/films.html'
        })
            .when('/best', {
                controller : 'BestController',
                templateUrl : 'views/films.html'
        })
            .when('/popularity', {
                controller : 'PopularController',
                templateUrl : 'views/films.html'
        })
            .when('/coming', {
                controller : 'ComingController',
                templateUrl : 'views/films.html'
        })
            .when('/favorites', {
                controller : 'ListController',
                templateUrl : 'views/lista.html'
        })
            .when('/film/:id', {
                controller : 'FilmController',
                templateUrl : 'views/film.html'
        })
            .otherwise({
                redirectTo : '/'
        });
    }
})();