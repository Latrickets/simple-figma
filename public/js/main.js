let figuraSeleccionada = "selected";
let figuraArrastrada = false;
let posX;
let posY;
let tamano;
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
            if (figura.tipo === "circulo") {
                let radio = figura.tamano / 2;
                fill(200);
                ellipse(
                    figura.posX + radio,
                    figura.posY + radio,
                    figura.tamano
                );
            } else if (figura.tipo === "rectangulo") {
                fill(255);
                rect(figura.posX, figura.posY, figura.tamano, figura.tamano);
            }
        }
    }

    // Dibujar la figura mientras se arrastra el mouse
    if (figuraArrastrada) {
        noFill();
        stroke(0);
        strokeWeight(2);

        if (figuraSeleccionada === "circulo") {
            let radio = dist(posX, posY, mouseX, mouseY) / 2;
            ellipse(posX + radio, posY + radio, radio * 2);
        } else if (figuraSeleccionada === "rectangulo") {
            rect(posX, posY, tamano, tamano);
        }
    }
}
function mousePressed() {}
function colisionCursorRectangulo(rectX, rectY, rectAncho, rectAlto) {
    if (
        mouseX >= rectX &&
        mouseX <= rectX + rectAncho &&
        mouseY >= rectY &&
        mouseY <= rectY + rectAlto
    ) {
        return true; // Hay colisión
    } else {
        return false; // No hay colisión
    }
}
function colisionCursorCirculo(circX, circY, circRadio) {
    const distancia = dist(mouseX, mouseY, circX, circY);
    if (distancia <= circRadio) {
        return true; // Hay colisión
    } else {
        return false; // No hay colisión
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
        visible: true,
    };
    if (
        figura.tipo !== "" &&
        figura.tipo !== undefined &&
        figuraSeleccionada !== "selected"
    ) {
        figuras.push(figura);
        inputHiddenFigures.value = JSON.stringify(figuras);
    }
    crearPanelCapas();
}

function mouseDragged() {
    tamano = dist(posX, posY, mouseX, mouseY);
}

function cambiarFigura() {
    if (document.getElementById("radioCirculo").checked) {
        figuraSeleccionada = "circulo";
    } else if (document.getElementById("radioRectangulo").checked) {
        figuraSeleccionada = "rectangulo";
    } else if (document.getElementById("radioSelect").checked) {
        figuraSeleccionada = "selected";
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
        figuraSeleccionada = null;
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
        figuraSeleccionada = null;
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
