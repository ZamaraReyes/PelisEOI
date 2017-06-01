$(document).ready(function(){
    $(".capa").click(function(){
        $(".ventana-contenido").removeClass("animated fadeOutRight");
        $(".ventana-contenido").addClass("animated fadeInRight");
    });
    $("#cerrar").click(function(){
        $(".ventana-contenido").removeClass("animated fadeInRight");
        $(".ventana-contenido").addClass("animated fadeOutRight");
    });
});