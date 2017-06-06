(function(){
    'use strict';
    
    angular
        .module('EOI')
        .controller('GenreController', GenreController);
        
    GenreController.$inject = ['$scope', '$http', 'FilmsFactory', 'FilmsHTTP', '$routeParams'];
    
    function GenreController($scope, $http, FilmsFactory, FilmsHTTP, $routeParams) {
        $scope.films = [];
        $scope.film = {};
        $scope.favoriteFilms = [];

    
        activate();

        
        searchGenre(28);

        
        function activate() {
            $scope.favoriteFilms = FilmsFactory.getDesiredList();
        }
        
        function searchGenre(genero) {
            FilmsHTTP.searchGenre(genero).then(function(film){
                $scope.films = film;
                console.log(genero);
                console.log($scope.films);
            }) 
        }
    }
})();