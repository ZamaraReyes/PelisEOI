(function(){
    'use strict';
    
    angular
        .module('EOI')
        .controller('FilmController', FilmController);
        
    FilmController.$inject = ['$scope', 'FilmsFactory', 'FilmsHTTP', '$routeParams', '$sce'];
    
    function FilmController($scope, FilmsFactory, FilmsHTTP, $routeParams, $sce) {
        
        $scope.similarFilms = [];
        $scope.subtitles = {};
        $scope.close = close;
        
        
        activate();
        
        
        function activate() {
            var filmId = $routeParams.id;
            
            
            FilmsHTTP.searchFilm(filmId).then(function(film){
                $scope.film = film;
                $scope.film.video = $sce.trustAsResourceUrl($scope.film.video);

                FilmsHTTP.filmSubtitles($scope.film.imdb).then(function(film){
                    $scope.$apply(function () {
                        $scope.subtitles = film;
                    })
                })
            })
            
            FilmsHTTP.similarFilm(filmId).then(function(film){
                $scope.similarFilms = film;
            })
        }
        
        function close() {
            window.history.go(-1);
        }
    }
})();