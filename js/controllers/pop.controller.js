(function(){
    'use strict';
    
    angular
        .module('EOI')
        .controller('PopularController', PopularController);
        
    PopularController.$inject = ['$scope', '$http', 'FilmsFactory', 'FilmsHTTP', '$routeParams'];
    
    function PopularController($scope, $http, FilmsFactory, FilmsHTTP, $routeParams) {
        $scope.films = [];
        $scope.film = {};
        $scope.favoriteFilms = [];
        $scope.addDesired = addDesired;
        $scope.keyPress = keyPress;
        
    
        activate();
        searchPopular();

        
        function activate() {
            $scope.favoriteFilms = FilmsFactory.getDesiredList();
        }
        
        
        function searchPopular() {
            FilmsHTTP.searchPopular().then(function(film){
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
            min: 0,
            max: 0,
        };
        
        
        $scope.sliderVote = {
            voteMin: 0,
            voteMax: 0,
        };
    }
})();