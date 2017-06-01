(function(){
    'use strict';
    
    angular
        .module('EOI')
        .controller('ListController', ListController);
        
    ListController.$inject = ['$scope', 'FilmsFactory', 'FilmsHTTP', '$routeParams'];
    
    function ListController($scope, FilmsFactory, FilmsHTTP, $routeParams) {
        $scope.films = [];
        $scope.removeDesired = removeDesired;
    
        
        activate();

        
        function activate() {
            $scope.films = FilmsFactory.getDesiredList();
        }
        
        function removeDesired(film) {
            FilmsFactory.removeDesired(film);
            $scope.films = FilmsFactory.getDesiredList();
        }
    }
})();