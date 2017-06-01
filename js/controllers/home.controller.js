(function(){
    'use strict';
    
    angular
        .module('EOI')
        .controller('HomeController', HomeController);
        
    HomeController.$inject = ['$scope', '$http', 'FilmsFactory', 'FilmsHTTP', '$routeParams', '$timeout'];
    
    function HomeController($scope, $http, FilmsFactory, FilmsHTTP, $routeParams, $timeout) {
        $scope.films = [];
        $scope.film = {};
        $scope.newFilms = {};
        $scope.favoriteFilms = [];
        
        $scope.searchCategory = searchCategory;
        $scope.searchBest = searchBest;
        $scope.searchPopular = searchPopular;
        $scope.searchComing = searchComing;
        $scope.searching = searching;
        
        $scope.addDesired = addDesired;

    
        activate();
        searchPeli();
        /*peliId();*/
        
        function activate() {
            $scope.favoriteFilms = FilmsFactory.getDesiredList();
        }
        
        function searchPeli() {
            FilmsHTTP.searchFilms().then(function(film){
                $scope.films = film;
                console.log($scope.films);
            })
        }
        
        function searchCategory() {
            FilmsHTTP.searchCategory().then(function(film){
                $scope.films = film;
            })
        }
        
        function searchBest() {
            FilmsHTTP.searchBest().then(function(film){
                $scope.films = film;
            })
        }
        
        function searchPopular(popular) {
            FilmsHTTP.searchPopular(popular).then(function(film){
                $scope.films = film;
            })
        }
        
        function searchComing() {
            FilmsHTTP.searchComing().then(function(film){
                $scope.films = film;
            })
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
        $scope.showModal = false;
        $scope.open = function() {
            $scope.showModal = true;
        };

    }
})();