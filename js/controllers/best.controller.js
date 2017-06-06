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

    
        activate();
        searchBest();

        
        function activate() {
            $scope.favoriteFilms = FilmsFactory.getDesiredList();
        }
        
        function searchBest() {
            FilmsHTTP.searchBest().then(function(film){
                $scope.films = film;
            })
        }
    }
})();