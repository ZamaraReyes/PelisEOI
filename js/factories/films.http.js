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
            searchBest : searchBest,
            searchPopular : searchPopular,
            searchComing : searchComing,
            searching : searching,
            search : search,
            searchGenre : searchGenre,
            year : year
        }
        
        return service;
        
        
        function searchFilms() {
            var films = [];
            
            return $http.get('https://api.themoviedb.org/3/movie/now_playing?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page=1').then(function(response){
                response.data.results.forEach(function (element, position){
                    
                    if (element.poster_path != ''){
                        films.push({
                            id: element.id,
                            title: element.title,
                            overview: element.overview,
                            photo: 'http://image.tmdb.org/t/p/w342'+element.poster_path,
                            genre: element.genre_ids,
                            date: element.release_date,
                            average: element.vote_average
                        });
                    } else if (element.poster_path == '') {
                        films.push({
                            id: element.id,
                            title: element.title,
                            overview: element.overview,
                            photo: 'http://www.behype.mx/wp-content/themes/behypedefault/img/no_imagen.png',
                            genre: element.genre_ids,
                            date: element.release_date,
                            average: element.vote_average
                        });
                    }       
                });
                console.log(films);
                return films;
            });
        }
        
        
        function search(pelicula) {
            var films = [];
            
            return $http.get('https://api.themoviedb.org/3/search/movie?api_key=d59205b54cbec181f81ddd43001c619b&query='+pelicula).then(function(response){
                response.data.results.forEach(function (element, position){
                    
                    if (element.title == pelicula) {
                        films.push({
                            id: element.id,
                            title: element.title,
                            overview: element.overview,
                            photo: 'http://image.tmdb.org/t/p/w342'+element.poster_path,
                            genre: element.genre_ids,
                            date: element.release_date,
                            average: element.vote_average
                        });
                    }
                });
                console.log(films);
                return films;
            });
        }
        
        
        function searchGenre(genero) {
            var films = [];
            
            return $http.get('https://api.themoviedb.org/3/genre/'+genero+'/movies?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&include_adult=false&sort_by=created_at.asc').then(function(response){
                response.data.results.forEach(function (element, position){
                    var imagen = element.poster_path;
                    if (element.poster_path != null){         
                        films.push({
                            id: element.id,
                            title: element.title,
                            overview: element.overview,
                            photo: 'http://image.tmdb.org/t/p/w342'+element.poster_path,
                            genre: element.genre_ids,
                            date: element.release_date,
                            average: element.vote_average
                        });
                    } else if (element.poster_path == null) {
                        films.push({
                            id: element.id,
                            title: element.title,
                            overview: element.overview,
                            photo: 'http://placehold.it/100x150',
                            genre: element.genre_ids,
                            date: element.release_date,
                            average: element.vote_average
                        });
                    }
                });
                console.log(response);
                return films;
            });
        }
        
        
        function year(min, max) {
            var films = [];
            
            return $http.get('https://api.themoviedb.org/3/discover/movie?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte='+min+'&primary_release_date.lte='+max).then(function(response){
                response.data.results.forEach(function (element, position){
                                
                    films.push({
                        id: element.id,
                        title: element.title,
                        overview: element.overview,
                        photo: 'http://image.tmdb.org/t/p/w342'+element.poster_path,
                        genre: element.genre_ids,
                        date: element.release_date,
                        average: element.vote_average
                    });
                    
                });
                return films;
            });
            searchFilm(filmId);
            
            console.log(film.id);
        }
        
        
        
        function searchFilm(filmId) {
            var films = {};
            
            return $http.get('https://api.themoviedb.org/3/movie/'+filmId+'?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US').then(function(response){
                films.id = response.data.id;
                films.imdb = response.data.imdb_id;
                films.title = response.data.title;
                films.photo = 'http://image.tmdb.org/t/p/w342'+response.data.poster_path;
                films.overview = response.data.overview;
                films.date = response.data.release_date;
                films.average = response.data.vote_average;
                console.log(films);

            
                
                var filmImdb = films.imdb;

                return $http.get('https://omdbapi.com?i='+filmImdb+'&apikey=3370463f').then(function(response){
                    films.genre = response.data.Genre;
                    films.year = response.data.Year;
                    films.runtime = response.data.Runtime;
                    films.database = response.data.Ratings[0].Value;
                    films.tomatoes = response.data.Ratings[1].Value;
                    films.metracritic = response.data.Ratings[2].Value;
                    console.log(response);


                    return films;
                    
                });
                
            });
            
        }
        
        
        
        /*function similarFilm(filmId) {
            var similarFilms = [];
            
            return $http.get('https://api.themoviedb.org/3/movie/'+filmId+'/similar?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page=1').then(function(response){
                response.data.results.forEach(function (element, position){
                    
                    similarFilms.push({
                        id: element.id,
                        title: element.title,
                        overview: element.overview,
                        photo: 'http://image.tmdb.org/t/p/w342'+element.poster_path,
                        average: element.vote_average
                    });
                    
                });
                return similarFilms;
                console.log(response);
            })
        }*/

        
        
        function searchBest() {
            var films = [];
            
            return $http.get('https://api.themoviedb.org/3/movie/top_rated?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page=1').then(function(response){
                response.data.results.forEach(function (element, position){
                    
                    films.push({
                        id: element.id,
                        title: element.title,
                        overview: element.overview,
                        photo: 'http://image.tmdb.org/t/p/w342'+element.poster_path,
                        average: element.vote_average
                    });
                    
                });
                return films;
            });
        }
            
        function searchPopular() {
            var films = [];
            
            return $http.get('https://api.themoviedb.org/3/movie/popular?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page=1').then(function(response){
                response.data.results.forEach(function (element, position){
                    
                    films.push({
                        id: element.id,
                        title: element.title,
                        overview: element.overview,
                        photo: 'http://image.tmdb.org/t/p/w342'+element.poster_path,
                        average: element.vote_average,
                        popularity: response.data.popularity
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
                        title: element.title,
                        overview: element.overview,
                        photo: 'http://image.tmdb.org/t/p/w342'+element.poster_path,
                        average: element.vote_average
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
                        title: element.title,
                        overview: element.overview,
                        photo: 'http://image.tmdb.org/t/p/w342'+element.poster_path,
                        average: element.vote_average
                    });
                    
                });
                return films;
            });
        }
    }
})();