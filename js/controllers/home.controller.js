(function(){
    'use strict';
    
    angular
        .module('EOI')
        .filter('rangeFilter', 'searchfor')
        .controller('HomeController', HomeController);
        
    HomeController.$inject = ['$scope', '$http', 'FilmsFactory', 'FilmsHTTP', '$routeParams', '$timeout', 'ngDialog'];
    
    function HomeController($scope, $http, FilmsFactory, FilmsHTTP, $routeParams, $timeout, ngDialog) {
        $scope.films = [];
        $scope.film = {};
        $scope.newFilms = {};
        $scope.favoriteFilms = [];
        

        $scope.searching = searching;
        
        $scope.addDesired = addDesired;

        $scope.search = search;
        $scope.year = year;
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
        
        
        
        
        $scope.keyPress = function($event, location) {
            var key = $event.which || $event.keyCode;
            if (key === 13) {
                search();
                /*window.location.href = '/' + location;*/
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

                
        
        var min = $scope.slider.min;
        var max = $scope.slider.max;
        year(min, max);
 
        function year(min, max) {
            FilmsHTTP.year(min, max).then(function(film){
            $scope.films = film;
            console.log($scope.films);
            console.log($scope.films[0]);
        })


            
        $scope.data = {"grade" : 0};
            
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
        
        
        $scope.mostrarModal = function() {
            ngDialog.open({
                template: 'film.html'
            });
    
        }
        }
    }
})();