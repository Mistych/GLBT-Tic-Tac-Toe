let jugadorX = "X";
let jugadorO = "O";
let jugador1 = localStorage.getItem('jugador1');
let jugador2 = localStorage.getItem('jugador2');
let jugadorActual = localStorage.getItem('jugadorActual');
let jugadorNameActual = localStorage.getItem('jugadorNameActual');


function nombreMayorPorOrdenAlfabetico(nombre1, nombre2) {
    nombre1 = nombre1.toLowerCase();
    nombre2 = nombre2.toLowerCase();

    if (nombre1 > nombre2) {
        return nombre2;
    } else if (nombre1 < nombre2) {
        return nombre1;
    } else {
        return "Error";
    }
}


function verificarNombres() {
    const jugador1 = document.getElementById('jugador1').value;
    const jugador2 = document.getElementById('jugador2').value;
    const mensajeError = document.getElementById('mensajeError');

    if (jugador1 === jugador2) {
        mensajeError.textContent = "👻 Los nombres de los jugadores no pueden ser iguales.";
        mensajeError.style.display = "block";
    } else {
        localStorage.setItem('jugador1', jugador1);
        localStorage.setItem('jugador2', jugador2);
        primerJugador = nombreMayorPorOrdenAlfabetico(jugador1, jugador2);
        if(primerJugador === jugador1){
            jugadorActual = jugadorX;
            localStorage.setItem('jugadorActual', jugadorX);
            localStorage.setItem('jugadorNameActual', jugador1);
            jugadorNameActual = jugador1;
            
        } if(primerJugador === jugador2){
            jugadorActual = jugadorO;
            localStorage.setItem('jugadorActual', jugadorO);
            localStorage.setItem('jugadorNameActual', jugador2);
            jugadorNameActual = jugador2;
            
        }
        
        window.location.href = 'juego.html';
    }
}