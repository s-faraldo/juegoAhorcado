// ### VARIABLES ###

// Array de palabras
var palabras = [["atlantico", "Un océano"], ["computadora", "Una calculadora evolucionada"], ["rosa", "Flor del amor"], ["plaza", "Espacio público verde"], ["rueda", "Gran invento"], ["manzana", "Una fruta"], ["jenga", "Un juego de caja"], ["pino", "Un árbol del pinar"], ["everest", "Famosa montaña"], ["relampago", "Antecede al trueno"], ["gato", "Un animal"], ["alemania", "Un país famoso por su cerveza"], ["uruguay", "Un país de vacas"], ["dibujo", "Representación gráfica"], ["picnic", "Actividad en la naturaleza"], ["bizcocho", "De la panadería"], ["pastel", "De la pastelería"], ["biblioteca", "Lugar para estudiar"], ["football", "Deporte mundial"], ["mermelada", "Pasta de frutas comestibles"],["oso", "Animal que hiberna"],["liceo", "Esclavos del..."],["rock", "Estilo de musica donde se usa la guitarra"],["pasta", "Comida italiana"],["francia", "El pais del amor"],["mate", "Bebida bien Uruguaya"],["biologia", "Ciencia que estudia los seres vivos"],["olla", "Utensilio de cocina"],["galletitas", "Bien de paraguayo"],["perú", "Razas indigenas"],["paraguay", "País que no existe"]];
// Palabra a averiguar
var palabra = "";
// Nº aleatorio
var rand;
// Palabra oculta
var oculta = [];
// Elemento html de la palabra
var hueco = document.getElementById("palabra");
// Contador de intentos
var cont = 6;
// Contador atrasado
var contA = 6;
// Botones de letras
var buttons = document.getElementsByClassName('letra');
// Boton de reset
var btnInicio = document.getElementById("reset");
var contP = 0;
var contG = 0;


// ### FUNCIONES ###

// Escoger palabra al azar
function generaPalabra() {
  rand = (Math.random() * 30).toFixed(0);
  palabra = palabras[rand][0].toUpperCase();
  console.log(palabra);
}

// Funcion para pintar los guiones de la palabra
function pintarGuiones(num) {
  for (var i = 0; i < num; i++) {
    oculta[i] = "_";
  }
  hueco.innerHTML = oculta.join(" ");
}

//Generar abecedario
function generaABC (a,z) {
  document.getElementById("abecedario").innerHTML = "";
  var i = a.charCodeAt(0), j = z.charCodeAt(0);
  var letra = "";
  for( ; i<=j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    document.getElementById("abecedario").innerHTML += "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='"+letra+"'>" + letra + "</button>";
  }
}

// Chequear intento
function intento(letra) {
  document.getElementById(letra).disabled = true;
  if(palabra.indexOf(letra) != -1) {
    for(var i=0; i<palabra.length; i++) {
      if(palabra[i]==letra) oculta[i] = letra;
    }
    hueco.innerHTML = oculta.join(" ");
    document.getElementById("acierto").innerHTML = "Bien!";
    document.getElementById("acierto").className += "acierto";
  }else{
    cont--;
    document.getElementById("intentos").innerHTML = cont;
    document.getElementById("acierto").innerHTML = "Fallo!";
    document.getElementById("acierto").className += "acierto";
    document.getElementById("image"+contA).className = "oculto";
    document.getElementById("image"+cont).className = "fade-in";
    contA--;
  }
  compruebaFin();
  setTimeout(function () { 
    document.getElementById("acierto").className = ""; 
  }, 800);
}

// Obtener pista
function pista() {
  document.getElementById("hueco-pista").innerHTML = palabras[rand][1];
}

// Compruba si ha fi1nalizado
function compruebaFin() {
  if( oculta.indexOf("_") == -1 ) {
    document.getElementById("acierto").innerHTML = "Felicidades !!";
    document.getElementById("acierto").className += "zoom-in";
    document.getElementById("palabra").className += " encuadre";
    ganar();
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").disabled = false;
    document.getElementById("pista").disabled = true;
    btnInicio.onclick = function() { location.reload() };

  }else if( cont == 0 ) {
    document.getElementById("acierto").innerHTML = "Game Over";
    document.getElementById("acierto").className += "zoom-in";
    perder();
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").disabled = false;
    document.getElementById("pista").disabled = true;
    btnInicio.onclick = function () { location.reload() };
  }
}

// Aumenta el contador si el usuario gana
function ganar(){
  contG = sessionStorage.getItem('ganadas');
  contG++;
  sessionStorage.setItem('ganadas', contG);
  document.getElementById("ganadas").innerHTML = contG;
}

// Aumenta el contador si el usuario pierde
function perder(){
  contP = sessionStorage.getItem('perdidas');
  contP++;
  sessionStorage.setItem('perdidas', contP);
  document.getElementById("perdidas").innerHTML = contP;
  console.log(contP);
}

function mostrarPerdidas(){
  contP = sessionStorage.getItem('perdidas');
  sessionStorage.setItem('perdidas', contP);
  document.getElementById("perdidas").innerHTML = contP;
}

function mostrarGanadas(){
  contG = sessionStorage.getItem('ganadas');
  sessionStorage.setItem('ganadas', contG);
  document.getElementById("ganadas").innerHTML = contG;
  console.log(contG);
}

// Restablecer juego
function inicio() {
  generaPalabra();
  pintarGuiones(palabra.length);
  generaABC("a","z");
  cont = 6;
  document.getElementById("reset").disabled = true;
  mostrarPerdidas();
  mostrarGanadas();
}