(function(){
    'use strict';
    
    angular
        .module('EOI')
        .controller('HomeController', HomeController);
        
    HomeController.$inject = ['$scope', '$http', 'FilmsFactory', 'FilmsHTTP', '$routeParams', '$timeout', '$window', '$sce'];
    
    function HomeController($scope, $http, FilmsFactory, FilmsHTTP, $routeParams, $timeout, $window, $sce) {
        $scope.films = [];
        $scope.film = {};
        $scope.newFilms = {};
        $scope.favoriteFilms = [];
        

        $scope.searching = searching;
        
        $scope.addDesired = addDesired;

        $scope.search = search;
        $scope.year = year;
        $scope.voteCount = voteCount;
        $scope.filmDetails = filmDetails;
        
    
        activate();
        /*searchPeli(1);
        se
        /*rangeFilter();
        searchfor();
        var genero = 28;
        searchGenre(genero);*/

        
        function activate() {
            $scope.favoriteFilms = FilmsFactory.getDesiredList();
        }
        


        
        function searchPeli() {

            FilmsHTTP.searchFilms().then(function(film){
                $scope.films = film;
            })
        }

        
        function filmDetails(film) {
            var filmId = film.id;
            
            FilmsHTTP.searchFilm(filmId).then(function(film){
                $scope.films = film;
            })
            console.log(film.id);
            /*FilmsHTTP.similarFilm(filmId).then(function(film){
                $scope.films = film;
            })
            console.log($scope.films);*/
        }
        
        
        function filmDeta(filmId) {
            var filmImdb = film.imdb;
            
            FilmsHTTP.searchFilm(filmImdb).then(function(film){
                $scope.films = film;
            })
            console.log(film.imdb);
        }
        
        
        
        function searching(searchPeli) {
            var pelicula = searchPeli;
            FilmsHTTP.searching(pelicula).then(function(film){
                $scope.films = film;
            })
        }
        
        function addDesired(film) {
            var respuesta = confirm("¿Deseas añadirlo en la lista de deseos?")
            if (respuesta == true) {
                FilmsFactory.setDesired(film);
                console.log(film);
            }
        }
        
        listGenre();
        
        function listGenre() {
            FilmsHTTP.listGenre().then(function(film){
                $scope.films = film;
            })
        }
        
        
        $scope.keyPress = function($event) {
            var key = $event.which || $event.keyCode;
            if (key === 13) {
                var pelicula = $scope.searchPeli;
                FilmsHTTP.search(pelicula).then(function(film){
                    $scope.films = film;
                })
                /*$window.location.href = '/search';*/
            }
        }
        
        function search(pelicula) {
            var pelicula = $scope.searchPeli;
            FilmsHTTP.search(pelicula).then(function(film){
                $scope.films = film;
            })
        }
        
        
        
        $scope.slider = {
            min: 1979,
            max: 2015,
            options: {
                ceil: 2015,
                floor: 1979,
                draggableRange: true
            }
        };
        
        
        $scope.sliderVote = {
            min: 0,
            max: 5,
            options: {
                ceil: 0,
                floor: 5,
                draggableRange: true
            }
        };

                
        
        var min = $scope.slider.min;
        var max = $scope.slider.max;
        year(min, max);
        
        $scope.totalFilms;
 
        function year(min, max, totalFilms) {
            FilmsHTTP.year(min, max, totalFilms).then(function(film){
                $scope.films = film;
                console.log($scope.films);
                console.log($scope.films[0]);
                console.log(totalFilms);
            })
        }


            
        $scope.$watch("slider", function(min, max) {
            $scope.minyear = parseInt($scope.slider.min);
            $scope.maxyear = parseInt($scope.slider.max);
            FilmsHTTP.year($scope.minyear, $scope.maxyear).then(function(film){
                $scope.films = film;
            })
            /*min = $scope.minyear;
            max = $scope.maxyear; 
            /*year($scope.slider.min, $scope.slider.max);*/
        }, true);
            
        
            
        function voteCount(vote) {
            FilmsHTTP.voteCount(vote).then(function(film){
                $scope.films = film;
                console.log($scope.films);
                console.log($scope.films[0]);
            })
        }
        
                                        
        $scope.$watch("sliderVote", function(vote) {
            $scope.minvote = parseInt($scope.sliderVote.min);
            $scope.maxvote = parseInt($scope.sliderVote.max);
            FilmsHTTP.voteCount($scope.minvote, $scope.maxvote).then(function(film){
                $scope.films = film;
            })
        }, true);
        
        
        /*min = $scope.minyear;
        max = $scope.maxyear;  
        year(min, max);*/
        
    
        $scope.searchGenre = function(genero) {
            FilmsHTTP.searchGenre(genero).then(function(film){
                $scope.films = film;
                console.log(genero);
                console.log($scope.films);
            }) 
        
        
        
        }
    }
})();