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
                
                FilmsHTTP.filmSubtitles(filmImdb).then(function(subtitle){
                    $scope.subtitles = subtitle;
                    
                })
                
            })
            
            FilmsHTTP.similarFilm(filmId).then(function(film){
                $scope.similarFilms = film;
            })
            
            
            $scope.ventana = true;
            $scope.close = function() {
                $scope.ventana = !$scope.ventana;
            }
            
        }
    }
})();