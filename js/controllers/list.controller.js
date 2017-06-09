(function(){
    'use strict';
    
    angular
        .module('EOI')
        .controller('ListController', ListController);
        
    ListController.$inject = ['$scope', 'FilmsFactory', 'FilmsHTTP', '$routeParams'];
    
    function ListController($scope, FilmsFactory, FilmsHTTP, $routeParams) {
        $scope.films = [];
        $scope.removeDesired = removeDesired;
        $scope.slider.min = 0;
        $scope.slider.max = 0;
        $scope.sliderVote.voteMin = 0;
        $scope.sliderVote.voteMax = 0;
        
        
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