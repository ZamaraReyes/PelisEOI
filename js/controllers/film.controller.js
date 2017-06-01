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
            FilmsHTTP.searchFilm(filmId).then(function(film){
                $scope.film = film;
                console.log(film);
                console.log($scope.film);
            })
        }
    }
})();