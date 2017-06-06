(function(){
    'use strict';
    
    angular
        .module('EOI')
        .controller('FilmController', FilmController);
        
    FilmController.$inject = ['$scope', 'FilmsFactory', 'FilmsHTTP', '$routeParams'];
    
    function FilmController($scope, FilmsFactory, FilmsHTTP, $routeParams) {
        
    
        activate();

        
        function activate() {
            var filmId = $routeParams.id;
            /*$scope.film = FilmsHTTP.searchFilm(filmId);*/
            
            FilmsHTTP.searchFilm(filmId).then(function(film){
                $scope.film = film;
            })
        }
    }
})();