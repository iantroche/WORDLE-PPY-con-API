let intentos= 6;
let palabra= "APPLE";

window.addEventListener('load', init)
function init(){
    console.log('Esto se ejecuta solo cuando se carga la pagina web')
}

let button= document.getElementById("guess-button");
button.addEventListener("click", intentar);

async function init() {
    palabra = await obtenerPalabraAleatoria();
    console.log(palabra); 
}

async function obtenerPalabraAleatoria() {
    try {
        const response = await fetch('https://random-word-api.herokuapp.com/word?length=5&lang=es');
        const data = await response.json();
        return data[0].toUpperCase();
    } catch (error) {
        console.error('Error al obtener la palabra:', error);
        return 'ERROR'; 
    }
}


let input= document.getElementById("guess-input");
let value= input.value

function intentar(){
    console.log(value);
}
function intentar() {
    const intentos = leerIntento();

    if (intentos === palabra) {
        terminar(`<h1>GANASTE!</h1>`);
        return;
    }

    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';

    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';

        if (intentos[i] === palabra[i]) {
            SPAN.innerHTML = intentos[i];
            SPAN.style.backgroundColor = '#79b851';
        } else if (palabra.includes(intentos[i])) {
            SPAN.innerHTML = intentos[i];
            SPAN.style.backgroundColor = '#f3c237';
        } else {
            SPAN.innerHTML = intentos[i];
            SPAN.style.backgroundColor = '#a4aec4';
        }

        ROW.appendChild(SPAN);
    }

    GRID.appendChild(ROW);
    actualizarIntentos();
    if (intentos === 0) {
        terminar(`<h1>¡PERDISTE! 😞</h1>`);
    }
}

   
 function leerIntento(){
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase(); 
    return intento;
 }
 function terminar(mensaje){
    const INPUT= document.getElementById("guess-input");
    const BOTON= document.getElementById("guess-button");
    INPUT.disabled = true;
    BOTON.disabled =true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

function actualizarIntentos() {
    intentos--;
    const intentosElement = document.getElementById('guesses');
    intentosElement.innerHTML = `<p>Intentos restantes: ${intentos}</p>`;
}