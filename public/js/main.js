let figuraSeleccionada;
let figuraArrastrada = false;
let posX;
let posY;
let tamano;
const divApp = document.getElementById('app');
let inputHiddenFigures = document.getElementById('figures');
let figuras = [];
if (inputHiddenFigures.value === '') {
} else {
    figuras.push(inputHiddenFigures.value);
    figuras = JSON.parse(figuras);
}
console.log(figuras);

function setup() {
    const canvas = createCanvas(divApp.offsetWidth, divApp.offsetHeight);
    canvas.parent('app');
    // Eventos de mouse para detectar cuando se arrastra el mouse
    canvas.mousePressed(empezarDibujo);
    canvas.mouseReleased(terminarDibujo);
}

function draw() {
    background(220);

    // Dibujar las figuras guardadas en el arreglo
    for (let i = 0; i < figuras.length; i++) {
        let figura = figuras[i];
        noFill();
        stroke(0);
        strokeWeight(2);

        if (figura.tipo === 'circulo') {
            ellipse(figura.posX, figura.posY, figura.tamano);
        } else if (figura.tipo === 'rectangulo') {
            rect(figura.posX, figura.posY, figura.tamano, figura.tamano);
        }
    }

    // Dibujar la figura mientras se arrastra el mouse
    if (figuraArrastrada) {
        noFill();
        stroke(0);
        strokeWeight(2);

        if (figuraSeleccionada === 'circulo') {
            ellipse(posX, posY, tamano);
        } else if (figuraSeleccionada === 'rectangulo') {
            rect(posX, posY, tamano, tamano);
        }
    }
}

function empezarDibujo() {
    figuraArrastrada = true;
    posX = mouseX;
    posY = mouseY;
    tamano = 0;
}

function terminarDibujo() {
    figuraArrastrada = false;

    // Guardar la figura en el arreglo
    let figura = {
        tipo: figuraSeleccionada,
        posX: posX,
        posY: posY,
        tamano: tamano,
    };
    if (figura.tipo !== '' && figura.tipo !== undefined) {
        figuras.push(figura);
        inputHiddenFigures.value = JSON.stringify(figuras);
        inputHiddenFigures.value = JSON.stringify(inputHiddenFigures.value);
    }
}

function mouseDragged() {
    tamano = dist(posX, posY, mouseX, mouseY);
}

function cambiarFigura() {
    if (document.getElementById('radioCirculo').checked) {
        figuraSeleccionada = 'circulo';
    } else if (document.getElementById('radioRectangulo').checked) {
        figuraSeleccionada = 'rectangulo';
    } else if (document.getElementById('radioSelect').checked) {
        figuraSeleccionada = '';
    }
}
