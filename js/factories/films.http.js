(function(){
    'use strict';
    
    angular
        .module('EOI')
        .factory('FilmsHTTP', FilmsHTTP);
        
    FilmsHTTP.$inject = ['$http'];
    
    function FilmsHTTP($http) {
        var service = {
            searchFilms : searchFilms,
            searchFilm : searchFilm,
            searchCategory : searchCategory,
            searchBest : searchBest,
            searchPopular : searchPopular,
            searchComing : searchComing,
            searching : searching
        }
        
        return service;
        
        function searchFilms() {
            var films = [];
            
            return $http.get('https://api.themoviedb.org/3/movie/now_playing?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page=1').then(function(response){
                response.data.results.forEach(function (element, position){
                    
                    films.push({
                        id: element.id,
                        title: element.title,
                        overview: element.overview,
                        photo: 'http://image.tmdb.org/t/p/w342'+element.poster_path
                    });
                    console.log(response);
                    
                });
                return films;
            });
        }
        
        function searchFilm(filmId) {
            var films = [];
            
            return $http.get('https://api.themoviedb.org/3/movie/'+filmId+'?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US').then(function(response){
                films.push({
                    id: response.data.id,
                    title: response.data.title,
                    overview: response.data.overview,
                    photo: 'http://image.tmdb.org/t/p/w342'+response.data.poster_path
                });
                console.log(films);
                console.log(films[0]);
                return films;
            });
        }
        
        function searchCategory() {
            var films = [];
            
            return $http.get('https://api.themoviedb.org/3/movie/list?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page=1').then(function(response){
                response.data.results.forEach(function (element, position){
                    
                    films.push({
                        id: element.id,
                        photo: 'http://image.tmdb.org/t/p/w342'+element.poster_path
                    });
                    
                });
                return films;
            });
        }
        
        function searchBest() {
            var films = [];
            
            return $http.get('https://api.themoviedb.org/3/movie/top_rated?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page=1').then(function(response){
                response.data.results.forEach(function (element, position){
                    
                    films.push({
                        id: element.id,
                        photo: 'http://image.tmdb.org/t/p/w342'+element.poster_path
                    });
                    
                });
                return films;
            });
        }
            
        function searchPopular(popular) {
            var films = [];
            var popular = 'popular';
            
            return $http.get('https://api.themoviedb.org/3/movie/'+popular+'?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page=1').then(function(response){
                response.data.results.forEach(function (element, position){
                    
                    films.push({
                        id: element.id,
                        photo: 'http://image.tmdb.org/t/p/w342'+element.poster_path
                    });
                    
                });
                return films;
            });
        }
        
        function searchComing() {
            var films = [];
            
            return $http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page=1').then(function(response){
                response.data.results.forEach(function (element, position){
                    
                    films.push({
                        id: element.id,
                        photo: 'http://image.tmdb.org/t/p/w342'+element.poster_path
                    });
                    
                });
                return films;
            });
        }
        
        function searching(pelicula) {
            var films = [];
                
            return $http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page=1').then(function(response){
                response.data.results.forEach(function (element, position){
                    
                    films.push({
                        id: element.id,
                        photo: 'http://image.tmdb.org/t/p/w342'+element.poster_path
                    });
                    
                });
                return films;
            });
        }
    }
})();