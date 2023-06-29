$("#nuevo").on("click", function () {
    $("[data-vista]").css("display", "none");
    $('[data-vista="ingresar"]').css("display", "block");
});

$(".volver, .cerrar").on("click", function () {
    $("[data-vista]").css("display", "none");
    $('[data-vista="inicio"]').css("display", "block");
    $('[data-modificando]').removeAttr('data-modificando');
});

$("#info").on("click", function () {
    $("[data-vista]").css("display", "none");
    $('[data-vista="datos"]').css("display", "block");
});

$('[data-vista="ingresar"] form').on("submit", function () {
    let d = new Date();
    let sDate = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
    let nombre = $("#nombre").val();
    let detalles = $("#detalles").val();
    let operacion = $("#operacion option:selected").text();
    
    let nuevo_card = $("<div></div>");
    nuevo_card.addClass("card mb-3")
              .html(`<div class="card-body">
            <h2 class="card-title" id="Name">${nombre}</h2>
            <p class="card-text" id="sDate">${sDate}</p>
            <p class="card-text" id="detalles">${detalles}</p>
            <p class="card-text" id="operacion">${operacion}</p>
            <div class="d-flex justify-content-end">
                <a href="#" class="editar mx-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg></a>
              
                <a href="#" class="eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16"><path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/></svg></a>
            </div>
        </div>`);
    $("#mascotas").prepend(nuevo_card);
    $('[data-vista="ingresar"] form')[0].reset();
    $("[data-vista]").css("display", "none");
    $('[data-vista="inicio"]').css("display", "block");
    guardarMascotas();

    return false;
});

$('#mascotas').on("click", ".card .card-body div .eliminar", function() {
    let rta = confirm("¿Estás seguro que querés eliminar esta nota?");
    if(rta) {
        $(this).parent().parent().parent().remove();
        guardarMascotas();
    }
});

$("#eliminarTodo").on("click", function () {
    let rta = confirm("¿Estás seguro que querés eliminar todas las notas?");
    if(rta) {
        $("#mascotas").children().remove();
        localStorage.clear();

    }
});

$('[data-vista="inicio"]').on("click", ".card .card-body div .editar", function() {
    let nombre = document.getElementById('Name').textContent
    let sDate = document.getElementById('sDate').textContent
    let detalles = document.getElementById('detalles').textContent
    let operacion = document.getElementById('operacion').textContent
    

    $("#nombre_mod").val(nombre);
    $("#detalles_mod").val(detalles);
    $("#sDate_mod").val(sDate);
    $("#operacion_mod").val(operacion);
    
    $(this).parent().parent().parent().attr("data-modificando", "este");
    $("[data-vista]").css("display", "none");
    $('[data-vista="modificar"]').css("display", "block");
});

$('[data-vista="modificar"] form').on("submit", function () {
    let nombre = $("#nombre_mod").val();
    let detalles = $("#detalles_mod").val();
    let sDate = $("#sDate_mod").val();
    let operacion = $("#operacion_mod").val();
    
    $('[data-modificando]').children("div").children("h2").text(nombre);
    $('[data-modificando]').children("div").children("p:nth-of-type(1)").text(sDate);
    $('[data-modificando]').children("div").children("p:nth-of-the-type(2)").text(detalles);
    $('[data-modificando]').children("div").children("p:nth-of-type(3)").text(operacion);
    
    $('[data-modificando]').removeAttr('data-modificando');
    $('[data-vista="modificar"] form')[0].reset();
    $("[data-vista]").css("display", "none");
    $('[data-vista="inicio"]').css("display", "block");
    
    guardarMascotas();

    return false;
});

function guardarMascotas() {

    let actuales = $("#mascotas").html();
    localStorage.setItem("mascotas", actuales);
}

$(function () {

    let guardados = localStorage.getItem("mascotas");

    if(guardados != null){
        $("#mascotas").html(guardados);
    }
})
