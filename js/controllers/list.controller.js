(function(){
    'use strict';
    
    angular
        .module('EOI')
        .controller('ListController', ListController);
        
    ListController.$inject = ['$scope', 'FilmsFactory', 'FilmsHTTP', '$routeParams'];
    
    function ListController($scope, FilmsFactory, FilmsHTTP, $routeParams) {
        $scope.films = [];
        $scope.removeDesired = removeDesired;
        $scope.keyPress = keyPress;
        
        
        activate();

        
        function activate() {
            $scope.films = FilmsFactory.getDesiredList();
        }
        
        function removeDesired(film) {
            FilmsFactory.removeDesired(film);
            $scope.films = FilmsFactory.getDesiredList();
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