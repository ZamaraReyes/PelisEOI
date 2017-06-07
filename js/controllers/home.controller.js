(function(){
    'use strict';
    
    angular
        .module('EOI')
        .controller('HomeController', HomeController);
        
    HomeController.$inject = ['$scope', '$http', 'FilmsFactory', 'FilmsHTTP', '$routeParams', '$timeout', '$sce'];
    
    function HomeController($scope, $http, FilmsFactory, FilmsHTTP, $routeParams, $timeout, $sce) {
        $scope.films = [];
        $scope.film = {};
        $scope.newFilms = {};
        $scope.favoriteFilms = [];
        $scope.addDesired = addDesired;
        $scope.filmDetails = filmDetails;
        
    
        activate();

        
        function activate() {
            $scope.favoriteFilms = FilmsFactory.getDesiredList();
        }
        
        
        /*function searchPeli() {

            FilmsHTTP.searchFilms().then(function(film){
                $scope.films = film;
            })
        }*/

        
        function filmDetails(film) {
            var filmId = film.id;      
            FilmsHTTP.searchFilm(filmId).then(function(film){
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

        
        
        $scope.keyPress = function($event) {
            var key = $event.which || $event.keyCode;
            if (key === 13) {
                var pelicula = $scope.searchPeli;
                FilmsHTTP.search(pelicula).then(function(film){
                    $scope.films = film.films;
                    $scope.total = film.totalFilms;
                })
            }
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
            voteMin: 0,
            voteMax: 10,
            options: {
                ceil: 10,
                floor: 0,
                draggableRange: true
            }
        };

                
        
        var min = $scope.slider.min;
        var max = $scope.slider.max;
        year(min, max);
        
        
 
        function year(min, max) {
            FilmsHTTP.year(min, max).then(function(film){
                $scope.films = film.films;
                $scope.total = film.totalFilms;
            })
        }

        
            
        $scope.$watch("slider", function(min, max) {
            $scope.minyear = parseInt($scope.slider.min);
            $scope.maxyear = parseInt($scope.slider.max);
            FilmsHTTP.year($scope.minyear, $scope.maxyear).then(function(film){
                $scope.films = film.films;
                $scope.total = film.totalFilms;
            })
            /*min = $scope.minyear;
            max = $scope.maxyear; 
            /*year($scope.slider.min, $scope.slider.max);*/
        }, true);
            
        
        
        /*function totalFilms(min, max) {
            FilmsHTTP.totalFilms(min, max).then(function(total){
                $scope.total = total;
            })
        }
        
        totalFilms(min, max);*/
        
        
        /*var voteMin = $scope.sliderVote.voteMin;
        var voteMax = $scope.sliderVote.voteMax;
        voteCount(voteMin, voteMax);
        
        
        function voteCount(voteMin, voteMax) {
            FilmsHTTP.voteCount(voteMin, voteMax).then(function(film){
                $scope.films = film;
                console.log($scope.films);
                console.log($scope.films[0]);
            })
        }
        
                                        
        $scope.$watch("sliderVote", function(voteMin, voteMax) {
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
                $scope.films = film.films;
                $scope.total = film.totalFilms;
            }) 
        
        }
    }
})();