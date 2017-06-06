(function(){
    'use strict';
    
    angular
        .module('EOI')
        .controller('SearchController', SearchController);
        
    SearchController.$inject = ['$scope', '$http', 'FilmsFactory', 'FilmsHTTP', '$routeParams'];
    
    function SearchController($scope, $http, FilmsFactory, FilmsHTTP, $routeParams) {
        $scope.films = [];
        $scope.film = {};
        $scope.favoriteFilms = [];

    
        activate();
        search();
        
        function activate() {
            $scope.favoriteFilms = FilmsFactory.getDesiredList();
        }
        
        function search(pelicula) {
            var pelicula = $scope.searchPeli;
        }
        
        function keyPress($event) {
            var key = $event.which || $event.keyCode;
            if (key === 13) {
                search(pelicula);
                /*window.location.href = '/' + location;*/
            }
        }
        
        function search(pelicula) {
            var pelicula = $scope.searchPeli;
            FilmsHTTP.search(pelicula).then(function(film){
                $scope.films = film;
            })
        }
    }
})();