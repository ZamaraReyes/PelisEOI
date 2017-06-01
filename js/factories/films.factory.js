(function(){
    'use strict';
    
    angular
        .module('EOI')
        .factory('FilmsFactory', FilmsFactory);
        
    FilmsFactory.$inject = [];
    
    function FilmsFactory() {
        return {
            getAll : getAll,
            getFilm : getFilm,
            getDesiredList : getDesiredList,
            setDesired : setDesired,
            removeDesired : removeDesired,
            update : update
        }
        
        function getAll() {
            if (localStorage.getItem("films")) {
                var filmsSaved = localStorage.getItem("films");
                var realFilms = JSON.parse(filmsSaved);
                
                if (typeof realFilms == "object" && realFilms instanceof Array)
                    return realFilms;
                else {
                    realFilms = [];
                    localStorage.setItem("films", JSON.stringify(realFilms));
                    return realFilms;
                }
            } else {
                return [];
            }
            console.log(filmsSaved);
        }
        
        function getFilm(id) {
            var films = getAll();
            var filmResult = {};
            
            films.forEach(function (film){
                if (film.id == id)
                    filmResult = film;
            })
            console.log(filmResult);
            console.log(films);
            return filmResult;
        }
        
        function getDesiredList() {
            if ('listFilm' in localStorage) {
                var stringified = localStorage.getItem('listFilm');
                return JSON.parse(stringified);
            } else {
                return [];
            }
        }
        
        function setDesired(film) {
            var lista = getDesiredList();
            var yaEstaba = false;
            
            lista.forEach(function (actualFilm){
                if (actualFilm.id == film.id)
                    yaEstaba = true;
                    alert("Esta peli ya está en la lista de deseos");
            })
            
            if (yaEstaba == false) {
                lista.push(film);
                localStorage.setItem('listFilm', JSON.stringify(lista));
            }
        }
        
        function removeDesired(film) {
            var lista = getDesiredList();
            var respuesta = confirm("¿Deseas eliminar este producto de la lista de deseados?");

            var encontrado = false;
                
            if (respuesta == true) {
                lista.forEach(function (actualFilm) {
                    if (actualFilm.id == film.id) {
                        encontrado = true;
                        var index = lista.indexOf(film);
                        lista.splice(index, 1);
                        alert("El producto ha sido eliminado")
                    }
                })
                    
                if (encontrado == true) {
                    localStorage.setItem('listFilm', JSON.stringify(lista));
                }           
            }
        }
        
        function update(films) {
            var newFilms = JSON.stringify(films);
            localStorage.setItem("films", newFilms);
        }
    }
})();