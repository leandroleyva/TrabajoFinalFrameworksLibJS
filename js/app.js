
$(document).ready(function(){

//Variables Generales
  var scoreTotal = 0;
  var movTotal = 0;
  var minuto = 2;
  var segundos = 0;
  var myTimer

//evento para cambiar de color el titulo
setInterval(function(){
var color=$(".main-titulo").css("color");
if(color=="rgb(220, 255, 14)")
{
$(".main-titulo").css("color","white");
}
else
{
$(".main-titulo").css("color","#DCFF0E");
}
},1000);

  //fin de evento para cambair de color el titulo
  
  //Evento boton de Iniciar
  $(".btn-reinicio").click(function (){
    valorBoton = $(this).text(); 
    if (valorBoton == "Iniciar") { 
      //ciclo para llenar el tablero
	  for (var f = 0; f < 7; f++) { 
      for (var i = 0; i <= 7; i++) {
          //ciclo para distribuir los dulces aleatoriamente
		  num = Math.floor((Math.random() * 4) + 1);
          $(".col-"+i).append("<img class= 'elemento' src='image/"+num+".png'>")
        }
      }
      $(this).text("Reiniciar"); //cambia texto Iniciar a Reiniciar
      myTimer = setInterval(timer, 1000) //Iniciar el contador
      analisaTablero() //funcion para analizar el tablero

    } else if (valorBoton == "Reiniciar") { //En reiniciar se recargamos la pagina
        location.reload()
    }
  })
  // Fin evento boton de Iniciar
  
  

  // Evento para analizar dulces iguales
  function analisisColumnas (){ 
    var ac = false
    for (var c = 1; c <= 7; c++) {
      for (var f = 1; f <= 7; f++) {
        imagen1 = $(".col-"+c).children("img:nth-child("+f+")").attr("src")
        imagen2 = $(".col-"+c).children("img:nth-child("+(f+1)+")").attr("src")
        imagen3 = $(".col-"+c).children("img:nth-child("+(f+2)+")").attr("src")
        if (imagen1 == imagen2 && imagen2 == imagen3) {
          $(".col-"+c).children("img:nth-child("+f+")").attr("class", "elemento igual")
          $(".col-"+c).children("img:nth-child("+(f+1)+")").attr("class", "elemento igual")
          $(".col-"+c).children("img:nth-child("+(f+2)+")").attr("class", "elemento igual")
          ac = true
        }
      }
    }
    return ac
  }
  function analisisFilas (){ 
    var af = false
    for (var f = 1; f <= 7; f++) {
      for (var c = 1; c <= 7; c++) {
        imagen1 = $(".col-"+f).children("img:nth-child("+c+")").attr("src")
        imagen2 = $(".col-"+(f+1)).children("img:nth-child("+c+")").attr("src")
        imagen3 = $(".col-"+(f+2)).children("img:nth-child("+c+")").attr("src")
        if (imagen1 == imagen2 && imagen2 == imagen3) {
          $(".col-"+f).children("img:nth-child("+c+")").attr("class", "elemento igual")
          $(".col-"+(f+1)).children("img:nth-child("+c+")").attr("class", "elemento igual")
          $(".col-"+(f+2)).children("img:nth-child("+c+")").attr("class", "elemento igual")
          af = true
        }
      }
    }
    return af
  }
  //Fin evento para analizar dulces iguales
  

  // Evennto para analizar el tablero
  function analisaTablero () {
      rac = analisisColumnas()
      raf = analisisFilas()
      if (rac == true || raf == true) {
        eliminarDulces()
      } else {
        mueveDulces()
      }
  }
  //Fin evento para analizar el tablero
  

  //Funcion para eliminar los ducles
  function eliminarDulces (){
    $(".igual").hide("pulsate",1000, function () {
      var score = $(".igual").length
      $("img").remove(".igual")
      scoreTotal = scoreTotal + score
      $("#score-text").html(scoreTotal)
      setTimeout(colocarDulces, 500)
      })
  }
  //Fin funcion para eliminar los ducles
  

  // Funcion para colocar nuevos dulces
  function colocarDulces (){
    for (var c = 1; c <= 7; c++) { 
      for (var f = 1; f <= 7; f++) { 
        if ($(".col-"+f).children("img:nth-child("+c+")").html() == null) { 
          var num = Math.floor((Math.random() * 4) + 1);
          $(".col-"+f).prepend("<img class= 'elemento' src='image/"+num+".png'>") 
        }
      }
    }
    analisaTablero()
  }
  // ...... final de repoblar dulces ......

  // Funcion para cambiar dulces
  function mueveDulces(){
    var dulce1
    var dulce2
    var dulceSrc1
    var dulceSrc2
    $("img").draggable({
        revert: "valid",
        containment: ".panel-tablero",
        start: function (event, ui){
          dulce1 = this
          dulceSrc1 = $(this).attr("src")
        }
    })
    $("img").droppable({
      drop: function (event, ui){
        dulce2 = this
        dulceSrc2 = $(this).attr("src")
        $(dulce2).attr("src", dulceSrc1)
        $(dulce1).attr("src", dulceSrc2)
        movTotal = movTotal + 1
        $("#movimientos-text").html(movTotal)
        setTimeout(analisaTablero, 500)
      }
    })
  }
  //Fin funcion para cambiar dulces
  
  //Funcion para el temporizador
  function timer(){
    if (segundos == 0 && minuto > 0) {
      segundos = 59
      minuto --
    } else if (segundos !== 0 && minuto >= 0) {
      segundos --
    } else if (segundos == 0 && minuto == 0) {
      clearInterval(myTimer);
      terminaTiempo()
    }
    if(segundos>9){
      $("#timer").html("0"+minuto+":"+segundos)
    } else {
      $("#timer").html("0"+minuto+":0"+segundos)
    }
  }

  function terminaTiempo (){
    $(".panel-tablero").hide("slow")
    $(".panel-score").animate({
      width: "100%",
    }, "slow")

  }
//Fin Funcion para el temporizador

});