let jugadorX = "X";
let jugadorO = "O";
let jugador1 = localStorage.getItem('jugador1');
let jugador2 = localStorage.getItem('jugador2');
let jugadorActual = localStorage.getItem('jugadorActual');
let jugadorNameActual = localStorage.getItem('jugadorNameActual');
let jugadorNameActualX = jugador1;
let jugadorNameActualO = jugador2;
let puntajeX = 0;
let puntajeO = 0;

const enlaceCambiarNombre1 = document.getElementById('cambiarNombre1');
enlaceCambiarNombre1.addEventListener('click', () => abrirVentanaCambiarNombre(1));

const enlaceCambiarNombre2 = document.getElementById('cambiarNombre2');
enlaceCambiarNombre2.addEventListener('click', () => abrirVentanaCambiarNombre(2));


function obtenerNombe(){
    if (jugador1 !== null) {
        document.getElementById("jugadorName1").textContent = jugador1;
    } else {
        document.getElementById("jugadorName1").textContent = "Nombre Jugador 1";
    }
    
    if (jugador2 !== null) {
        document.getElementById("jugadorName2").textContent = jugador2;
    } else {
        document.getElementById("jugadorName2").textContent = "Nombre Jugador 2";
    }
}


function abrirVentanaCambiarNombre(jugadorNumero) {
    let nuevoNombre = prompt(`Ingrese el nuevo nombre para Jugador ${jugadorNumero}:(Los cambios se verán reflejados en el siguiente turno)`);

    while (nuevoNombre !== null) {
        // Verificar si el nuevo nombre ya existe en el Local Storage
        if ((jugadorNumero === 1 && nuevoNombre !== localStorage.getItem('jugador2')) ||
            (jugadorNumero === 2 && nuevoNombre !== localStorage.getItem('jugador1'))) {
            // Los nombres son diferentes, podemos actualizar
            if (jugadorNumero === 1) {
                localStorage.setItem('jugador1', nuevoNombre);
                jugadorNameActualX = nuevoNombre;
                document.getElementById("jugadorName1").textContent = nuevoNombre;
            } else if (jugadorNumero === 2) {
                localStorage.setItem('jugador2', nuevoNombre);
                jugadorNameActualO = nuevoNombre;
                document.getElementById("jugadorName2").textContent = nuevoNombre;
            }
            break; // Salir del bucle si los nombres son diferentes
        } else {
            // Los nombres son iguales, pedir nuevamente
            nuevoNombre = prompt("Los nombres no pueden ser iguales. Ingrese un nombre diferente:");
        }
    }
}

obtenerNombe();



function alternarJugador() {
    jugadorActual = (jugadorActual === jugadorX) ? jugadorO : jugadorX;
    document.getElementById("jugadorName").textContent = jugadorNameActual;
    document.getElementById("turno").textContent = jugadorActual;
    if (jugadorActual === jugadorX) {
        document.getElementById("jugadorName").textContent = jugadorNameActualX;
    } else {
        document.getElementById("jugadorName").textContent = jugadorNameActualO;
    }
}

function verificarTriqui() {
    const casillas = document.querySelectorAll('.casilla');
    
    const combinacionesGanadoras = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combinacion of combinacionesGanadoras) {
        const [a, b, c] = combinacion;

        if (casillas[a].textContent === jugadorX &&
            casillas[b].textContent === jugadorX &&
            casillas[c].textContent === jugadorX) {
            
            return true;
        }

        if (casillas[a].textContent === jugadorO &&
            casillas[b].textContent === jugadorO &&
            casillas[c].textContent === jugadorO) {
            
            return true;
        }
    }

    return false;
}

function tableroLleno() {
    const casillas = document.querySelectorAll('.casilla');

    for (const casilla of casillas) {
        if (casilla.textContent === '') {
            return false; 
        }
    }

    return true; 
}

function limpiarTablero() {
    const casillas = document.querySelectorAll('.casilla');

    casillas.forEach(casilla => {
        casilla.textContent = '';
    });
}

function mostrarMensajeGanador(jugador) {
    const jugadorGanadorElement = document.getElementById("jugadorGanador");
    jugadorGanadorElement.textContent = jugador;
    const mensajeGanadorElement = document.getElementById("mensajeGanador");
    mensajeGanadorElement.style.display = "block";
}



const casillas = document.querySelectorAll('.casilla');
casillas.forEach(casilla => {
    
    jugadorNameActual = localStorage.getItem('jugadorNameActual');
    document.getElementById("jugadorName").textContent = jugadorNameActual;
    document.getElementById("turno").textContent = jugadorActual;
    casilla.addEventListener('click', () => {
        if (casilla.textContent === '') {
            const mensajeGanadorElement = document.getElementById("mensajeGanador");
            mensajeGanadorElement.style.display = "none";
            casilla.textContent = jugadorActual;
            const botonAplicarCambios = document.getElementById('aplicarCambios');
            botonAplicarCambios.addEventListener('click', cambiarValoresJugadores);
            verificarTriqui();
            if (verificarTriqui() === true) {
                mostrarMensajeGanador(jugadorActual);
                if (jugadorActual === jugadorX) {
                    puntajeX += 1;
                    localStorage.setItem('puntajeX', puntajeX.toString());
                    limpiarTablero();
                } else {
                    puntajeO += 1;
                    localStorage.setItem('puntajeO', puntajeO.toString());
                    limpiarTablero();
                }
            }

            if (tableroLleno() === true && verificarTriqui() === false) {
                alert('Empate. No hay ganador.');
                limpiarTablero();
            }

            if (tableroLleno()) {
                limpiarTablero();
            }

            alternarJugador();



        }
    });
});

function cambiarValoresJugadores() {
    const nuevoValorJugadorX = document.getElementById('nuevoJugadorX').value;
    const nuevoValorJugadorO = document.getElementById('nuevoJugadorO').value;

    // Verificar si los nuevos valores no son nulos ni cadenas vacías
    if (nuevoValorJugadorX !== null && nuevoValorJugadorX.trim() !== "") {
        jugadorX = nuevoValorJugadorX;
    }

    if (nuevoValorJugadorO !== null && nuevoValorJugadorO.trim() !== "") {
        jugadorO = nuevoValorJugadorO;
    }

    // Actualizar las casillas con los nuevos valores
    const casillas = document.querySelectorAll('.casilla');
    casillas.forEach(casilla => {
        if (casilla.textContent === "X") {
            casilla.textContent = jugadorX;
        } else if (casilla.textContent === "O") {
            casilla.textContent = jugadorO;
        }
    });

    // Actualizar el texto de las etiquetas con los nuevos valores
    const etiquetaJugadorX = document.querySelector('label[for="nuevoJugadorX"]');
    const etiquetaJugadorO = document.querySelector('label[for="nuevoJugadorO"]');
    etiquetaJugadorX.textContent = `Nuevo Valor de ${jugadorX}:`;
    etiquetaJugadorO.textContent = `Nuevo Valor de ${jugadorO}:`;
}

