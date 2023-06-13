let herramientaSeleccionada = "selected";
let figuraSeleccionada = null;
let figuraArrastrada = false;
let posX;
let posY;
let tamano;
let textoPrompt;
const divApp = document.getElementById("app");
let inputHiddenFigures = document.getElementById("figures");
let figuras = [];
if (inputHiddenFigures.value === "") {
} else {
    figuras.push(inputHiddenFigures.value);
    figuras = JSON.parse(figuras);
}
console.log(figuras);

function setup() {
    const canvas = createCanvas(divApp.offsetWidth, divApp.offsetHeight);
    canvas.parent("app");
    // Eventos de mouse para detectar cuando se arrastra el mouse
    canvas.mousePressed(empezarDibujo);
    canvas.mouseReleased(terminarDibujo);

    crearPanelCapas();
}

function draw() {
    background(220);

    // Dibujar las figuras guardadas en el arreglo
    for (let i = figuras.length - 1; i >= 0; i--) {
        let figura = figuras[i];
        stroke(0);
        strokeWeight(2);
        if (figura.visible) {
            if (figura.seleccionada) {
                stroke(255, 0, 0);
                strokeWeight(4);
                noFill();
            }
            if (figura.tipo === "circulo") {
                let radio = figura.radio / 2;
                fill(200);
                ellipse(figura.posX + radio, figura.posY + radio, figura.radio);
            } else if (figura.tipo === "rectangulo") {
                fill(255);
                rect(figura.posX, figura.posY, figura.ancho, figura.alto);
            } else if (figura.tipo === "linea") {
                line(figura.posX, figura.posY, figura.posX2, figura.posY2);
            } else if (figura.tipo === "texto") {
                fill(0);
                textSize(32);
                text(figura.texto, figura.posX, figura.posY);
            }
        }
    }

    // Dibujar la figura mientras se arrastra el mouse
    if (figuraArrastrada) {
        noFill();
        stroke(0);
        strokeWeight(2);

        if (herramientaSeleccionada === "circulo") {
            let radio = dist(posX, posY, mouseX, mouseY) / 2;
            ellipse(posX + radio, posY + radio, radio * 2);
        } else if (herramientaSeleccionada === "rectangulo") {
            rect(posX, posY, tamano, tamano);
        } else if (herramientaSeleccionada === "linea") {
            line(posX, posY, mouseX, mouseY);
        } else if (herramientaSeleccionada === "texto") {
            textoPrompt = prompt("Ingrese el texto", "");
            fill(0);
            textSize(32);
            text(textoPrompt, posX, posY);
            terminarDibujo();
            textoPrompt = "";
        }
    }
}
// Función para detectar colisión entre el cursor y un círculo
function colisionCirculo(mouseX, mouseY, posX, posY, radio) {
    // Implementa la lógica para verificar la colisión entre el cursor y el círculo
    const rad = radio / 2;
    const distancia = dist(mouseX, mouseY, posX + rad, posY + rad);
    return distancia < radio / 2;
}

// Función para detectar colisión entre el cursor y un rectángulo
function colisionRectangulo(mouseX, mouseY, posX, posY, ancho, alto) {
    // Implementa la lógica para verificar la colisión entre el cursor y el rectángulo
    const dentroX = mouseX >= posX && mouseX <= posX + ancho;
    const dentroY = mouseY >= posY && mouseY <= posY + alto;
    return dentroX && dentroY;
}

function mouseClicked() {
    // Itera sobre las figuras en orden inverso para seleccionar la mas reciente primero
    figuras.forEach((figura) => {
        figura.seleccionada = false;
    });
    if (herramientaSeleccionada === "selected") {
        for (let i = 0; i < figuras.length; i++) {
            const figura = figuras[i];
            // Verificar colisión según el tipo de figura
            if (
                figura.tipo === "circulo" &&
                colisionCirculo(
                    mouseX,
                    mouseY,
                    figura.posX,
                    figura.posY,
                    figura.radio
                )
            ) {
                figura.seleccionada = true;
                console.log(figura);
                console.log("se selecciono un circulo");
                break;
            }

            if (
                figura.tipo === "rectangulo" &&
                colisionRectangulo(
                    mouseX,
                    mouseY,
                    figura.posX,
                    figura.posY,
                    figura.ancho,
                    figura.alto
                )
            ) {
                figura.seleccionada = true;
                console.log(figura);
                console.log("se selecciono un rectangulo");
                break;
            }
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

    // funcion anterior, ahora se usa el constructor de cada clase
    // Guardar la figura en el arreglo
    // let figura = {
    //     tipo: herramientaSeleccionada,
    //     posX: posX,
    //     posY: posY,
    //     posX2: mouseX,
    //     posY2: mouseY,
    //     tamano: tamano,
    //     texto: textoPrompt,
    //     visible: true,
    // };
    // if (herramientaSeleccionada === "selected") {
    //     figura = figuraSeleccionada;
    // }

    // if (
    //     (figura.tipo !== "" &&
    //         figura.tipo !== undefined &&
    //         herramientaSeleccionada !== "selected") ||
    //     (herramientaSeleccionada === "texto" && figura.texto !== "")
    // ) {
    //     figuras.push(figura);
    //     inputHiddenFigures.value = JSON.stringify(figuras);
    // }
    if (herramientaSeleccionada !== "selected") {
        if (herramientaSeleccionada === "rectangulo") {
            figuras.push(new Rectangulo(posX, posY, tamano, tamano));
            inputHiddenFigures.value = JSON.stringify(figuras);
        }
        if (herramientaSeleccionada === "circulo") {
            figuras.push(new Circulo(posX, posY, tamano));
            inputHiddenFigures.value = JSON.stringify(figuras);
        }
        if (herramientaSeleccionada === "linea") {
            figuras.push(new Linea(posX, posY, mouseX, mouseY));
            inputHiddenFigures.value = JSON.stringify(figuras);
        }
        if (herramientaSeleccionada === "texto") {
            figuras.push(new Texto(posX, posY, textoPrompt, null));
            inputHiddenFigures.value = JSON.stringify(figuras);
        }
    }
    crearPanelCapas();
}

function mouseDragged() {
    tamano = dist(posX, posY, mouseX, mouseY);
}

function cambiarFigura() {
    if (document.getElementById("radioCirculo").checked) {
        herramientaSeleccionada = "circulo";
    } else if (document.getElementById("radioRectangulo").checked) {
        herramientaSeleccionada = "rectangulo";
    } else if (document.getElementById("radioLinea").checked) {
        herramientaSeleccionada = "linea";
    } else if (document.getElementById("radioTexto").checked) {
        herramientaSeleccionada = "texto";
    } else if (document.getElementById("radioSelect").checked) {
        herramientaSeleccionada = "selected";
    }
}
function crearPanelCapas() {
    const layersPanel = document.getElementById("layersPanel");

    // Limpiar el contenido actual del panel
    layersPanel.innerHTML = "<h3>Capas</h3>";

    // Crear una capa para cada figura en el arreglo 'figuras'
    for (let i = 0; i < figuras.length; i++) {
        const figura = figuras[i];
        // Crear un div para la capa
        const layerDiv = document.createElement("div");
        layerDiv.className = "layer";
        // Crear un span para el nombre de la figura
        const nombreSpan = document.createElement("span");
        nombreSpan.textContent = figura.tipo;

        // Crear botones para subir, bajar, eliminar e invisible
        const btnSubir = document.createElement("input");
        btnSubir.type = "button";
        btnSubir.value = "Subir";
        btnSubir.onclick = () => subirFigura(figura);

        const btnBajar = document.createElement("input");
        btnBajar.type = "button";
        btnBajar.value = "Bajar";
        btnBajar.onclick = () => bajarFigura(figura);

        const btnEliminar = document.createElement("input");
        btnEliminar.type = "button";
        btnEliminar.value = "Eliminar";
        btnEliminar.onclick = () => eliminarFigura(figura);

        const btnInvisible = document.createElement("input");
        btnInvisible.type = "button";
        btnInvisible.value = "Invisible";
        btnInvisible.onclick = () => hacerInvisible(figura);

        // Agregar el nombre de la figura y los botones al div de la capa
        layerDiv.appendChild(nombreSpan);
        layerDiv.appendChild(btnSubir);
        layerDiv.appendChild(btnBajar);
        layerDiv.appendChild(btnEliminar);
        layerDiv.appendChild(btnInvisible);

        // Agregar el div de la capa al panel
        layersPanel.appendChild(layerDiv);
    }
    function subirFigura(figura) {
        const indice = figuras.indexOf(figura);
        if (indice > 0) {
            figuras.splice(indice, 1);
            figuras.splice(indice - 1, 0, figura);
        }
        redraw();
        crearPanelCapas(); // Actualizar el panel de capas
        updateFigures();
    }

    function bajarFigura(figura) {
        const indice = figuras.indexOf(figura);
        if (indice < figuras.length - 1) {
            figuras.splice(indice, 1);
            figuras.splice(indice + 1, 0, figura);
        }
        redraw();
        crearPanelCapas(); // Actualizar el panel de capas
        updateFigures();
    }

    function eliminarFigura(figura) {
        const indice = figuras.indexOf(figura);
        figuras.splice(indice, 1);
        herramientaSeleccionada = null;
        redraw();
        crearPanelCapas(); // Actualizar el panel de capas
        updateFigures();
    }

    function hacerInvisible(figura) {
        if (figura.visible) {
            figura.visible = false;
        } else {
            figura.visible = true;
        }
        herramientaSeleccionada = null;
        redraw(); // Volver a dibujar el lienzo para actualizar la visibilidad de las figuras
        crearPanelCapas(); // Actualizar el panel de capas
        updateFigures();
    }
}
function updateFigures() {
    inputHiddenFigures.value = JSON.stringify(figuras);
    redraw();
    crearPanelCapas();
}
class Rectangulo {
    constructor(posX, posY, ancho, alto, relleno, color) {
        this.tipo = "rectangulo";
        this.posX = posX;
        this.posY = posY;
        this.ancho = ancho;
        this.alto = alto;
        this.relleno = relleno;
        this.visible = true;
        this.color = color;
        this.seleccionada = false;
    }
}
class Circulo {
    constructor(posX, posY, radio, relleno, color) {
        this.tipo = "circulo";
        this.posX = posX;
        this.posY = posY;
        this.radio = radio;
        this.relleno = relleno;
        this.color = color;
        this.visible = true;
        this.seleccionada = false;
    }
}
class Texto {
    constructor(posX, posY, texto, fuente) {
        this.tipo = "texto";

        this.posX = posX;
        this.posY = posY;
        this.texto = texto;
        this.fuente = fuente;
        this.visible = true;
        this.seleccionada = false;
    }
}
class Linea {
    constructor(posX, posY, posX2, posY2, grosor, color) {
        this.tipo = "linea";

        this.posX = posX;
        this.posY = posY;
        this.posX2 = posX2;
        this.posY2 = posY2;
        this.grosor = grosor;
        this.color = color;
        this.visible = true;
        this.seleccionada = false;
    }
}
