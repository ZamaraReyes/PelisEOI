(function(){
    'use strict';
    
    angular
        .module('EOI')
        .controller('ComingController', ComingController);
        
    ComingController.$inject = ['$scope', '$http', 'FilmsFactory', 'FilmsHTTP', '$routeParams'];
    
    function ComingController($scope, $http, FilmsFactory, FilmsHTTP, $routeParams) {
        $scope.films = [];
        $scope.film = {};
        $scope.favoriteFilms = [];
        $scope.addDesired = addDesired;
        $scope.slider.min = 0;
        $scope.slider.max = 0;
        $scope.sliderVote.voteMin = 0;
        $scope.sliderVote.voteMax = 0;
        
    
        activate();
        searchComing();

        
        function activate() {
            $scope.favoriteFilms = FilmsFactory.getDesiredList();
        }
        
        
        function searchComing() {
            FilmsHTTP.searchComing().then(function(film){
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
    }
})();