let turno = 0;
let partidaTerminada = false;//boolean de partida terminada para que cuando sea true es que ha acabado la partida

//funcion para pulsar el simbolo x o y
function pulsarCelda(x, y) {
   if (partidaTerminada) {//si la partida esta terminada sale de la función
      return;
   }
   if (turno == 0) {
      correrReloj();//si el turno es el 0 comience el reloj
   }
  
   if (document.getElementById("x" + x + "y" + y).innerText != "") { // Comprueba que la celda no haya sido antes pulsada.
      return;
   }

   if (turno % 2 == 0) {// Escribe en la celda X o O dependiendo del turno.
      document.getElementById("x" + x + "y" + y).innerText = "X";//para establecer el texto x con innertext
      document.getElementById("x" + x + "y" + y).classList.add("turnoX");//clase para cambiar el color
   } else {
      document.getElementById("x" + x + "y" + y).innerText = "O";
      document.getElementById("x" + x + "y" + y).classList.add("turnoO");
   }
   turno++; // Añadimos un turno si este ha sido válido.

   cambiarTurno();//se llama a la función cambiar el turno
   comprobarVictoria(x, y);//se llama a la función para que comprueba si hay resultado ganador
}


//función para que se compruebe si hay resultado ganador
function comprobarVictoria(x, y) {
   let compruebaVictoria = true;
   // Comprueba el eje Y.
   for (let i = 0; i < 3; i++) {//se hace un for para que recorra por el eje y las 3 celdas
      if (
         document.getElementById("x" + x + "y" + y).innerText != document.getElementById("x" + x + "y" + i).innerText
      ) {
         compruebaVictoria = false;//si son diferentes la pulsada a las otras dos celdas de la misma fila no gana
      }
   }
   if (compruebaVictoria) {//sino gana partida
      victoria();
      return;
   }

   compruebaVictoria = true;


   // Comprueba el eje X.
   for (let i = 0; i < 3; i++) {
      if (
         document.getElementById("x" + x + "y" + y).innerText != document.getElementById("x" + i + "y" + y).innerText
      ) {
         compruebaVictoria = false;
      }
   }
   if (compruebaVictoria) {
      victoria();
      return;
   }

   // Comprueba Diagonal de izquierda a derecha
   if (
      document.getElementById("x1y1").innerText != "" && //verifica la celda central que no esté vacía para que no salte victoria al estar las 3 vacías
      document.getElementById("x0y0").innerText == document.getElementById("x1y1").innerText && //verifica que son iguales  0,0 y 1,1
      document.getElementById("x0y0").innerText == document.getElementById("x2y2").innerText) //verifiva si 0,0 es igual a 2,2
      {
      victoria();// si son iguales llama a la funcion victoria
      return;
   }

   // Comprueba Diagonal de derecha a izquierda
   if (
      document.getElementById("x1y1").innerText != "" &&
      document.getElementById("x1y1").innerText == document.getElementById("x2y0").innerText &&
      document.getElementById("x1y1").innerText == document.getElementById("x0y2").innerText) {
      victoria();
      return;
   }

   // Comprueba si fue empate
   if (turno == 9) {//si el turno se llega a 9 que son las celdas que hay sin victoria sale el nombre empate y se para el tiempos
      document.getElementById("turno").innerText = "¡Empate!";
      clearTimeout(tiempoTimeOut);
   }
}

function victoria() {
   partidaTerminada = true; // Prohibimos que puedan seguir jugando.

   document.getElementById("turno").classList.add("victoria"); //se modifica el texto añadiendo clase victoria
   document.getElementById("victoria").play();// cuando es victoria comienza la música

   if (turno % 2 != 0) {// se evalúa de quien ha sido el último turno antes de declarar la victoria e imprime quien ha ganado
      document.getElementById("turno").innerHTML = "Ganaron las <span class='turnoX'>X</span>";
   } else {
      document.getElementById("turno").innerHTML = "Ganaron las <span class='turnoO'>O</span>";
   }

   clearTimeout(tiempoTimeOut);// para parar el tiempo
}

function cambiarTurno() {
   if (turno % 2 == 0) {//evalúa de quien es el turno actual e imprime de quien es
      document.getElementById("turno").innerHTML = "Turno de las <span class='turnoX'>X</span>";
   } else {
      document.getElementById("turno").innerHTML = "Turno de las <span class='turnoO'>O</span>";
   }
}

function nuevaPartida() {
   // Para y reinicia el reloj.
   clearTimeout(tiempoTimeOut);
   document.getElementById("tiempo").innerText = "00:00";
   segundos = 0;
   ms = 0;

   // Para el audio de vicoria y la proxima vez que se ejecute lo hara desde el principio.
   document.getElementById("victoria").pause();
   document.getElementById("victoria").currentTime = 0;
   // Permite volver a juagar
   partidaTerminada = false;
   // Reinicia los turnos.
   turno = 0;

   for (let x = 0; x < 3; x++) {//al ser nueva partida reescribe las celdas a vacío
      for (let y = 0; y < 3; y++) {
         document.getElementById("x" + x + "y" + y).innerText = "";
         document.getElementById("x" + x + "y" + y).className = "box";
      }
   }
}

let segundos = 0;
let ms = 0;
let tiempoTimeOut;
function correrReloj() {//funcion para iniciar el reloj
   ms++;
   if (ms == 10) {
      ms = 0;
      segundos++;
   }

   document.getElementById("tiempo").innerText = segundos + ":0" + ms;
   tiempoTimeOut = setTimeout(() => correrReloj(), 100);
}
