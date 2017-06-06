(function(){
    'use strict';
    
    angular
        .module('EOI', ['ngRoute', 'rzModule', 'ngDialog']).config(config);
    
    config.$inject = ['$routeProvider', '$locationProvider'];
    
    function config($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                controller : 'HomeController',
                templateUrl : '/views/films.html'
        })
            .when('/search', {
                controller : 'SearchController',
                templateUrl : '/views/films.html'
        })
            .when('/action', {
                controller : 'HomeController',
                templateUrl : '/views/films.html'
        /*})
            .when('/adventure', {
                controller : 'GenreController',
                templateUrl : '/views/films.html'
        })
            .when('/animation', {
                controller : 'GenreController',
                templateUrl : '/views/films.html'
        })
            .when('/comedy', {
                controller : 'GenreController',
                templateUrl : '/views/films.html'
        })
            .when('/crime', {
                controller : 'GenreController',
                templateUrl : '/views/films.html'
        })
            .when('/documentary', {
                controller : 'GenreController',
                templateUrl : '/views/films.html'
        })
            .when('/drama', {
                controller : 'GenreController',
                templateUrl : '/views/films.html'
        })
            .when('/family', {
                controller : 'GenreController',
                templateUrl : '/views/films.html'
        })
            .when('/fantasy', {
                controller : 'GenreController',
                templateUrl : '/views/films.html'
        })
            .when('/historic', {
                controller : 'GenreController',
                templateUrl : '/views/films.html'
        })
            .when('/horror', {
                controller : 'GenreController',
                templateUrl : '/views/films.html'
        })
            .when('/music', {
                controller : 'GenreController',
                templateUrl : '/views/films.html'
        })
            .when('/mystery', {
                controller : 'GenreController',
                templateUrl : '/views/films.html'
        })
            .when('/romance', {
                controller : 'GenreController',
                templateUrl : '/views/films.html'
        })
            .when('/fiction', {
                controller : 'GenreController',
                templateUrl : '/views/films.html'
        })
            .when('/tvmovies', {
                controller : 'GenreController',
                templateUrl : '/views/films.html'
        })
            .when('/thiller', {
                controller : 'GenreController',
                templateUrl : '/views/films.html'
        })
            .when('/war', {
                controller : 'GenreController',
                templateUrl : '/views/films.html'
        })
            .when('/western', {
                controller : 'GenreController',
                templateUrl : '/views/films.html'*/
        })
            .when('/best', {
                controller : 'BestController',
                templateUrl : '/views/films.html'
        })
            .when('/popularity', {
                controller : 'PopularController',
                templateUrl : '/views/films.html'
        })
            .when('/coming', {
                controller : 'ComingController',
                templateUrl : '/views/films.html'
        })
            .when('/favorites', {
                controller : 'ListController',
                templateUrl : '/views/lista.html'
        })
            .when('/film/:id', {
                controller : 'FilmController',
                templateUrl : '/views/film.html'
        })
            .otherwise({
                redirectTo : '/'
        });
    }
})();