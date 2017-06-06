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

    
        activate();
        searchPopular();

        
        function activate() {
            $scope.favoriteFilms = FilmsFactory.getDesiredList();
        }
        
        function searchPopular() {
            FilmsHTTP.searchPopular().then(function(film){
                $scope.films = film;
            })
        }
    }
})();