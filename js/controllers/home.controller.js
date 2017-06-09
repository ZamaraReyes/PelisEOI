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
        $scope.searchGenre = searchGenre;
        $scope.keyPress = keyPress;
        $scope.clear = clear;
        
    
        activate();

        
        function activate() {
            $scope.favoriteFilms = FilmsFactory.getDesiredList();
        }


        
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
            }
        }

        
        
        function keyPress($event) {
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
        
        
 
        function year(min, max, voteMin, voteMax) {
            FilmsHTTP.year(min, max, voteMin, voteMax).then(function(film){
                $scope.films = film.films;
                $scope.total = film.totalFilms;
            })
        }

        
            
        $scope.$watch("slider", function(min, max, voteMin, voteMax) {
            $scope.minyear = parseInt($scope.slider.min);
            $scope.maxyear = parseInt($scope.slider.max);
            year($scope.minyear, $scope.maxyear, $scope.sliderVote.voteMin, $scope.sliderVote.voteMax);
        }, true);

        
                                        
        $scope.$watch("sliderVote", function(min, max, voteMin, voteMax) {
            $scope.minvote = parseInt($scope.sliderVote.voteMin);
            $scope.maxvote = parseInt($scope.sliderVote.voteMax);
            year($scope.minyear, $scope.maxyear, $scope.sliderVote.voteMin, $scope.sliderVote.voteMax);
        }, true);

        
    
        function searchGenre(genero) {
            FilmsHTTP.searchGenre(genero).then(function(film){
                $scope.films = film.films;
                $scope.total = film.totalFilms;
            }) 
        }
        
        
        function clear(min, max, voteMin, voteMax) {
            $scope.slider.min = 1979;
            $scope.slider.max = 2015;
            $scope.sliderVote.voteMin = 0;
            $scope.sliderVote.voteMax = 10;
        }
    }
})();