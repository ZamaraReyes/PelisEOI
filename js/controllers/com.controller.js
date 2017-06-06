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

    
        activate();
        searchComing();

        
        function activate() {
            $scope.favoriteFilms = FilmsFactory.getDesiredList();
        }
        
        function searchComing() {
            FilmsHTTP.searchComing().then(function(film){
                $scope.films = film;
            })
        }
    }
})();