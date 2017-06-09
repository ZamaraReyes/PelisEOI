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
        $scope.slider.min = 0;
        $scope.slider.max = 0;
        $scope.sliderVote.voteMin = 0;
        $scope.sliderVote.voteMax = 0;
        
    
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
    }
})();