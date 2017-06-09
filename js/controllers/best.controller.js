(function(){
    'use strict';
    
    angular
        .module('EOI')
        .controller('BestController', BestController);
        
    BestController.$inject = ['$scope', '$http', 'FilmsFactory', 'FilmsHTTP', '$routeParams'];
    
    function BestController($scope, $http, FilmsFactory, FilmsHTTP, $routeParams) {
        $scope.films = [];
        $scope.film = {};
        $scope.favoriteFilms = [];
        $scope.addDesired = addDesired;
        $scope.slider.min = 0;
        $scope.slider.max = 0;
        $scope.sliderVote.voteMin = 0;
        $scope.sliderVote.voteMax = 0;
        
    
        activate();
        searchBest();
        
        
        function activate() {
            $scope.favoriteFilms = FilmsFactory.getDesiredList();
        }
        
        
        function searchBest() {
            FilmsHTTP.searchBest().then(function(film){
                $scope.films = film.films;
                $scope.total = film.totalFilms;
            })
        }
        
        
        function addDesired(film) {
            var respuesta = confirm("¿Deseas añadirlo en la lista de deseos?")
            if (respuesta == true) {
                FilmsFactory.setDesired(film);
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
    }
})();