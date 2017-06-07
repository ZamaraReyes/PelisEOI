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
            searchGenre : searchGenre,
            year : year,
            similarFilm : similarFilm,
            voteCount : voteCount,
            totalFilms : totalFilms,
            search : search,
            filmSubtitles : filmSubtitles
        }
        
        return service;
        
        
        function searchFilms() {
            var films = [];
            
            return $http.get('https://api.themoviedb.org/3/movie/now_playing?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page=1').then(function(response){
                var totalFilms = response.data.total_results;
                
                response.data.results.forEach(function (element){
                    
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
                return {
                    films : films,
                    totalFilms : totalFilms
                }
            });
        }
        
        
        
        function search(pelicula) {
            var films = [];
            
            return $http.get('https://api.themoviedb.org/3/search/movie?api_key=d59205b54cbec181f81ddd43001c619b&query='+pelicula).then(function(response){
                var totalFilms = response.data.total_results;
                
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
                return {
                    films : films,
                    totalFilms : totalFilms
                }
            });
        }
        
        
        
        function searchGenre(genero) {
            var films = [];
            
            return $http.get('https://api.themoviedb.org/3/genre/'+genero+'/movies?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&include_adult=false&sort_by=created_at.asc').then(function(response){
                var totalFilms = response.data.total_results;
                
                response.data.results.forEach(function (element){
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
                return {
                    films : films,
                    totalFilms : totalFilms
                }
            });
        }
        

        
        function year(min, max) {
            var films = [];
            
            return $http.get('https://api.themoviedb.org/3/discover/movie?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte='+min+'&primary_release_date.lte='+max).then(function(response){
                var totalFilms = response.data.total_results;
                
                response.data.results.forEach(function (element){
                                
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
                return {
                    films : films,
                    totalFilms : totalFilms
                }
            });
        }

        
        
        function totalFilms(min, max) {
            
            return $http.get('https://api.themoviedb.org/3/discover/movie?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte='+min+'&primary_release_date.lte='+max).then(function(response){
                var totalFilms = response.data.total_results;
                return totalFilms;
            });
        }
        
        
        
        function voteCount(voteMin, voteMax) {
            var films = [];
            
            return $http.get('https://api.themoviedb.org/3/discover/movie?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte='+voteMin+'&vote_average.lte='+voteMax).then(function(response){
                var totalFilms = response.data.total_results;
                
                response.data.results.forEach(function (element){
                                
                    films.push({
                        id: element.id,
                        title: element.title,
                        overview: element.overview,
                        photo: 'http://image.tmdb.org/t/p/w342'+element.poster_path,
                        genre: element.genre_ids,
                        date: element.release_date,
                        average: element.vote_average
                    });
                    console.log(response);
                    
                });
                return {
                    films : films,
                    totalFilms : totalFilms
                }
            });
        }
        
        
        
        function searchFilm(filmId) {
            var films = {};
            var genres = [];
            
            return $http.get('https://api.themoviedb.org/3/movie/'+filmId+'?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US').then(function(response){
                films.id = response.data.id;
                
                /*if (response.data.imdb_id != null) {
                    
                }*/
                
                films.imdb = response.data.imdb_id;
                films.title = response.data.title;
                films.genres = response.data.genres;
                films.photo = 'http://image.tmdb.org/t/p/w342'+response.data.poster_path;
                films.overview = response.data.overview;
                films.date = response.data.release_date;
                films.average = response.data.vote_average;
                
                
                var filmImdb = films.imdb;

                return $http.get('https://omdbapi.com?i='+filmImdb+'&apikey=3370463f').then(function(response){
                    films.year = response.data.Year;
                    films.production = response.data.Production;
                    films.runtime = response.data.Runtime;
                    /*films.database = response.data.Ratings[0].Value;
                    films.tomatoes = response.data.Ratings[1].Value;
                    films.metracritic = response.data.Ratings[2].Value;*/
                    
                    if (response.data.Ratings != null){
                        films.database = response.data.Ratings[0].Value;
                        films.tomatoes = response.data.Ratings[1].Value;
                        films.metracritic = response.data.Ratings[2].Value;
                    } else if (response.data.Ratings == null) {
                        films.database = '0';
                        films.tomatoes = '0';
                        films.metracritic = '0';
                    }
                    
                    console.log(response);
                    
                    
                    return $http.get('https://api.themoviedb.org/3/movie/'+filmId+'/videos?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US').then(function(response){

                        response.data.results.forEach(function (element){
                            films.video = 'https://www.youtube.com/embed/'+element.key;
                        });
                        
                        return films;
                        console.log(films);
                        
                        films.forEach(function(element){
                            if (element == null) {
                                element == 0;
                            }
                        })
                    });
                    
                });
            
            });
            
        }
        
        
        
        function similarFilm(filmId) {
            var similarFilms = [];
            
            return $http.get('https://api.themoviedb.org/3/movie/'+filmId+'/similar?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US').then(function(response){
                response.data.results.forEach(function (element){
                    
                    if (similarFilms.length < 5) {
                        similarFilms.push({
                            id: element.id,
                            title: element.title,
                            overview: element.overview,
                            photo: 'http://image.tmdb.org/t/p/w342'+element.poster_path,
                            average: element.vote_average
                        });
                    }
                    
                });
                return similarFilms;
            })
        }

        
        
        function searchBest() {
            var films = [];
            
            
            return $http.get('https://api.themoviedb.org/3/movie/top_rated?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page=1').then(function(response){
                var totalFilms = response.data.total_results;
                
                response.data.results.forEach(function (element){
                    
                    films.push({
                        id: element.id,
                        title: element.title,
                        overview: element.overview,
                        photo: 'http://image.tmdb.org/t/p/w342'+element.poster_path,
                        average: element.vote_average
                    });
                    
                });
                return {
                    films : films,
                    totalFilms : totalFilms
                }
            });
        }
        
        
        
        function searchPopular() {
            var films = [];
            
            return $http.get('https://api.themoviedb.org/3/movie/popular?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page=1').then(function(response){
                var totalFilms = response.data.total_results;
                
                response.data.results.forEach(function (element){
                    
                    films.push({
                        id: element.id,
                        title: element.title,
                        overview: element.overview,
                        photo: 'http://image.tmdb.org/t/p/w342'+element.poster_path,
                        average: element.vote_average,
                        popularity: response.data.popularity
                    });
                    
                });
                return {
                    films : films,
                    totalFilms : totalFilms
                }
            });
        }
        
        
        function searchComing() {
            var films = [];
            
            return $http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page=1').then(function(response){
                var totalFilms = response.data.total_results;
                
                response.data.results.forEach(function (element){
                    
                    films.push({
                        id: element.id,
                        title: element.title,
                        overview: element.overview,
                        photo: 'http://image.tmdb.org/t/p/w342'+element.poster_path,
                        average: element.vote_average
                    });
                    
                });
                return {
                    films : films,
                    totalFilms : totalFilms
                }
            });
        }
        
        
        
        function searching(pelicula) {
            var films = [];
                
            return $http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=d59205b54cbec181f81ddd43001c619b&language=en-US&page=1').then(function(response){
                response.data.results.forEach(function (element){
                    
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
        
        
        function filmSubtitles(filmImdb) {
            console.log(filmImdb);
            var subtitles = {};
            const OS = require('opensubtitles-api');
            const OpenSubtitles = new OS({
                useragent:'OSTestUserAgent',
                username: 'TeddyPicker91',
                password: '134162jkl',
                ssl: true
            });
            
            OpenSubtitles.login()
                .then(res => {
                    console.log(res.token);
                    console.log(res.userinfo);
                })
                .catch(err => {
                    console.log(err);
                });
            
            return OpenSubtitles.search({
                imdbid: filmImdb,
                limit: 'best',
                sublanguageid: 'en,es'
            })
                .then(res => {
                    subtitles = {
                        es: res.es,
                        en: res.en,
                        de: res.de
                    }
                    return subtitles;
                })
        }
    }
})();