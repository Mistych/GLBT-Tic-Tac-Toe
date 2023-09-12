function actualizarPuntajes() {
    let puntajeXGuardado = parseInt(localStorage.getItem('puntajeX')) || 0;
    let puntajeOGuardado = parseInt(localStorage.getItem('puntajeO')) || 0;
    const puntajeXElement = document.getElementById('playerOneScore');
    const puntajeOElement = document.getElementById('playerTwoScore');
    puntajeXElement.textContent = puntajeXGuardado;
    puntajeOElement.textContent = puntajeOGuardado;
}

const botonActualizarOne = document.getElementById('playerOne');
botonActualizarOne.addEventListener('click', actualizarPuntajes);

const botonActualizarTwo = document.getElementById('playerTwo');
botonActualizarTwo.addEventListener('click', actualizarPuntajes);