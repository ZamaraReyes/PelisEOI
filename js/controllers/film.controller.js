(function(){
    'use strict';
    
    angular
        .module('EOI')
        .controller('FilmController', FilmController);
        
    FilmController.$inject = ['$scope', 'FilmsFactory', 'FilmsHTTP', '$routeParams', '$sce'];
    
    function FilmController($scope, FilmsFactory, FilmsHTTP, $routeParams, $sce) {
        
        $scope.similarFilms = [];
        $scope.subtitles = {};
        
        
        activate();
        
        
        function activate() {
            var filmId = $routeParams.id;
            
            
            FilmsHTTP.searchFilm(filmId).then(function(film){
                $scope.film = film;
                var filmImdb = film.imdb;
                $scope.film.video = $sce.trustAsResourceUrl($scope.film.video);
            })
            
            FilmsHTTP.similarFilm(filmId).then(function(film){
                $scope.similarFilms = film;
            })
            var filmImdb = 'tt0325980';
            
            FilmsHTTP.filmSubtitles(filmImdb).then(function(subtitle){
                console.log(filmImdb);
                $scope.subtitles = subtitle; 
            })
        }
    }
})();