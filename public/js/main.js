let canvas = null;
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
let inputImage = document.getElementById("image");
let formSave = document.getElementById("formSave");
formSave.addEventListener("submit", save);
function save(e) {
    e.preventDefault();
    const imageCover = canvas.elt.toDataURL("image/png", 0.5);
    inputImage.value = imageCover;
    this.submit();
}

if (inputHiddenFigures.value === "") {
} else {
    figuras.push(inputHiddenFigures.value);
    figuras = JSON.parse(figuras);
}
console.log(figuras);

function setup() {
    canvas = createCanvas(divApp.offsetWidth, divApp.offsetHeight);
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
                fill(255);
                stroke(0);
                let radio = figura.radio / 2;
                if (figura.color) {
                    fill(figura.color);
                }
                if (figura.border) {
                    stroke(figura.border);
                }
                ellipse(figura.posX + radio, figura.posY + radio, figura.radio);
            } else if (figura.tipo === "rectangulo") {
                fill(255);
                stroke(0);
                if (figura.color) {
                    fill(figura.color);
                }
                if (figura.border) {
                    stroke(figura.border);
                }
                rect(figura.posX, figura.posY, figura.ancho, figura.alto);
            } else if (figura.tipo === "linea") {
                if (figura.color) {
                    stroke(figura.color);
                }
                if (figura.grosor) {
                    strokeWeight(figura.grosor);
                }
                line(figura.posX, figura.posY, figura.posX2, figura.posY2);
            } else if (figura.tipo === "texto") {
                textSize(20);
                fill(0);
                stroke(0);
                if (figura.color) {
                    fill(figura.color);
                }
                if (figura.border) {
                    stroke(figura.border);
                }
                if (figura.grosor) {
                    textSize(figura.grosor);
                }
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
function colisionTexto(mouseX, mouseY, texto, posX, posY) {
    textSize(20);
    const anchoTexto = textWidth(texto);
    const altoTexto = textAscent() + textDescent();

    if (
        mouseX >= posX &&
        mouseX <= posX + anchoTexto &&
        mouseY >= posY - altoTexto &&
        mouseY <= posY
    ) {
        return true; // Colisión detectada
    } else {
        return false; // No hay colisión
    }
}

function colisionLinea(x, y, x1, y1, x2, y2) {
    // Calcular la distancia más cercana entre el punto (x, y) y la línea
    const distancia = calcDistanciaPuntoLinea(x, y, x1, y1, x2, y2);

    // Verificar si la distancia es menor o igual a un umbral (por ejemplo, 5 píxeles)
    if (distancia <= 5) {
        return true; // Colisión detectada
    } else {
        return false; // No hay colisión
    }
}

function calcDistanciaPuntoLinea(x, y, x1, y1, x2, y2) {
    const numerador = Math.abs(
        (y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1
    );
    const denominador = Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
    return numerador / denominador;
}

function mouseClicked() {
    figuras.forEach((figura) => {
        figura.seleccionada = false;
        figuraSeleccionada = null;
    });
    if (herramientaSeleccionada === "selected") {
        for (let i = 0; i < figuras.length; i++) {
            const figura = figuras[i];
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
                figuraSeleccionada = i;
                console.log(figura);
                console.log("se selecciono un circulo");
                crearPanelAttributes(figuraSeleccionada);
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
                figuraSeleccionada = i;
                console.log(figura);
                console.log("se selecciono un rectangulo");
                crearPanelAttributes(figuraSeleccionada);
                break;
            }
            if (
                figura.tipo === "texto" &&
                colisionTexto(
                    mouseX,
                    mouseY,
                    figura.texto,
                    figura.posX,
                    figura.posY
                )
            ) {
                figura.seleccionada = true;
                figuraSeleccionada = i;
                console.log(figura);
                console.log("se selecciono un texto");
                crearPanelAttributes(figuraSeleccionada);
                break;
            }
            if (
                figura.tipo === "linea" &&
                colisionLinea(
                    mouseX,
                    mouseY,
                    figura.posX,
                    figura.posY,
                    figura.posX2,
                    figura.posY2
                )
            ) {
                figura.seleccionada = true;
                figuraSeleccionada = i;
                console.log(figura);
                console.log("se selecciono una linea");
                crearPanelAttributes(figuraSeleccionada);
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

function crearPanelAttributes(id) {
    const atributosPanel = document.getElementById("atributosPanel");
    atributosPanel.innerHTML = "";

    const nombreSpan = document.createElement("span");
    nombreSpan.textContent = "Propiedades";
    nombreSpan.className = "fs-5 d-none d-sm-inline my-2";
    atributosPanel.appendChild(nombreSpan);
    let figurita = figuras[id];
    console.log(figurita);

    const divXY = document.createElement("div");
    divXY.className = "row container mt-2 pt-1";

    const divColX = document.createElement("div");
    divColX.className = "col";
    const divRowX = document.createElement("div");
    divRowX.className = "row";
    const pInDivX = document.createElement("p");
    pInDivX.className = "col-4";
    pInDivX.textContent = "X";
    const inputInDivX = document.createElement("input");
    inputInDivX.className = "col-8 property";
    inputInDivX.type = "number";
    inputInDivX.value = figurita.posX;
    inputInDivX.addEventListener("change", () => {
        figurita.posX = Number(inputInDivX.value);
        figuras[id] = figurita;
        updateFigures();
    });
    divRowX.appendChild(pInDivX);
    divRowX.appendChild(inputInDivX);
    divColX.appendChild(divRowX);
    divXY.appendChild(divColX);
    atributosPanel.appendChild(divXY);

    const divColY = document.createElement("div");
    divColY.className = "col";
    const divRowY = document.createElement("div");
    divRowY.className = "row";
    const pInDivY = document.createElement("p");
    pInDivY.className = "col-4";
    pInDivY.textContent = "Y";
    const inputInDivY = document.createElement("input");
    inputInDivY.className = "col-8 property";
    inputInDivY.type = "number";
    inputInDivY.value = figurita.posY;
    inputInDivY.addEventListener("change", () => {
        figurita.posY = Number(inputInDivY.value);
        figuras[id] = figurita;
        updateFigures();
    });
    divRowY.appendChild(pInDivY);
    divRowY.appendChild(inputInDivY);
    divColY.appendChild(divRowY);
    divXY.appendChild(divColY);
    atributosPanel.appendChild(divXY);

    if (figurita.tipo === "linea") {
        const divXY2 = document.createElement("div");
        divXY2.className = "row container mt-2";
        const divColX2 = document.createElement("div");
        divColX2.className = "col";
        const divRowX2 = document.createElement("div");
        divRowX2.className = "row";
        const pInDivX2 = document.createElement("p");
        pInDivX2.className = "col-4";
        pInDivX2.textContent = "X2";
        const inputInDivX2 = document.createElement("input");
        inputInDivX2.className = "col-8 property";
        inputInDivX2.type = "number";
        inputInDivX2.value = figurita.posX2;
        inputInDivX2.addEventListener("change", () => {
            figurita.posX2 = Number(inputInDivX2.value);
            figuras[id] = figurita;
            updateFigures();
        });
        divRowX2.appendChild(pInDivX2);
        divRowX2.appendChild(inputInDivX2);
        divColX2.appendChild(divRowX2);
        divXY2.appendChild(divColX2);
        atributosPanel.appendChild(divXY2);

        const divColY2 = document.createElement("div");
        divColY2.className = "col";
        const divRowY2 = document.createElement("div");
        divRowY2.className = "row";
        const pInDivY2 = document.createElement("p");
        pInDivY2.className = "col-4";
        pInDivY2.textContent = "Y2";
        const inputInDivY2 = document.createElement("input");
        inputInDivY2.className = "col-8 property";
        inputInDivY2.type = "number";
        inputInDivY2.value = figurita.posY2;
        inputInDivY2.addEventListener("change", () => {
            figurita.posY2 = Number(inputInDivY2.value);
            figuras[id] = figurita;
            updateFigures();
        });
        divRowY2.appendChild(pInDivY2);
        divRowY2.appendChild(inputInDivY2);
        divColY2.appendChild(divRowY2);
        divXY2.appendChild(divColY2);
        atributosPanel.appendChild(divXY2);
    }

    if (figurita.tipo === "circulo") {
        const divR = document.createElement("div");
        divR.className = "row container mt-2";
        const divColR = document.createElement("div");
        divColR.className = "col";
        const divRowR = document.createElement("div");
        divRowR.className = "row";
        const pInDivR = document.createElement("p");
        pInDivR.className = "col-4";
        pInDivR.textContent = "R";
        const inputInDivR = document.createElement("input");
        inputInDivR.className = "col-8 property";
        inputInDivR.type = "number";
        inputInDivR.value = figurita.radio;
        inputInDivR.addEventListener("change", () => {
            figurita.radio = Number(inputInDivR.value);
            figuras[id] = figurita;
            updateFigures();
        });
        divRowR.appendChild(pInDivR);
        divRowR.appendChild(inputInDivR);
        divColR.appendChild(divRowR);
        divR.appendChild(divColR);
        atributosPanel.appendChild(divR);
    }

    if (figurita.tipo === "rectangulo") {
        const divWH = document.createElement("div");
        divWH.className = "row container mt-2";
        const divColW = document.createElement("div");
        divColW.className = "col";
        const divRowW = document.createElement("div");
        divRowW.className = "row";
        const pInDivW = document.createElement("p");
        pInDivW.className = "col-4";
        pInDivW.textContent = "W";
        const inputInDivW = document.createElement("input");
        inputInDivW.className = "col-8 property";
        inputInDivW.type = "number";
        inputInDivW.value = figurita.ancho;
        inputInDivW.addEventListener("change", () => {
            figurita.ancho = Number(inputInDivW.value);
            figuras[id] = figurita;
            updateFigures();
        });

        divRowW.appendChild(pInDivW);
        divRowW.appendChild(inputInDivW);
        divColW.appendChild(divRowW);
        divWH.appendChild(divColW);
        atributosPanel.appendChild(divWH);

        const divColH = document.createElement("div");
        divColH.className = "col";
        const divRowH = document.createElement("div");
        divRowH.className = "row";
        const pInDivH = document.createElement("p");
        pInDivH.className = "col-4";
        pInDivH.textContent = "H";
        const inputInDivH = document.createElement("input");
        inputInDivH.className = "col-8 property";
        inputInDivH.type = "number";
        inputInDivH.value = figurita.alto;
        inputInDivH.addEventListener("change", () => {
            figurita.alto = Number(inputInDivH.value);
            figuras[id] = figurita;
            updateFigures();
        });
        divRowH.appendChild(pInDivH);
        divRowH.appendChild(inputInDivH);
        divColH.appendChild(divRowH);
        divWH.appendChild(divColH);
        atributosPanel.appendChild(divWH);
    }
    const RellenoSpan = document.createElement("span");
    RellenoSpan.textContent = "Propiedades";
    RellenoSpan.className = "fs-5 d-none d-sm-inline my-2";
    atributosPanel.appendChild(RellenoSpan);

    const divRelleno = document.createElement("div");
    divRelleno.className = "row container mt-2";
    const divColRelleno = document.createElement("div");
    divColRelleno.className = "col";
    const divRowRelleno = document.createElement("div");
    divRowRelleno.className = "row";
    const pInDivRelleno = document.createElement("p");
    pInDivRelleno.className = "col-4";
    pInDivRelleno.textContent = "Color";
    const inputInDivRelleno = document.createElement("input");
    inputInDivRelleno.className = "col-8 property";
    inputInDivRelleno.type = "color";
    inputInDivRelleno.value = figurita.color;
    inputInDivRelleno.addEventListener("change", () => {
        figurita.color = inputInDivRelleno.value;
        figuras[id] = figurita;
        updateFigures();
    });
    divRowRelleno.appendChild(pInDivRelleno);
    divRowRelleno.appendChild(inputInDivRelleno);
    divColRelleno.appendChild(divRowRelleno);
    divRelleno.appendChild(divColRelleno);
    atributosPanel.appendChild(divRelleno);

    if (figurita.tipo !== "linea") {
        const divBorder = document.createElement("div");
        divBorder.className = "row container mt-2";
        const divColBorder = document.createElement("div");
        divColBorder.className = "col";
        const divRowBorder = document.createElement("div");
        divRowBorder.className = "row";
        const pInDivBorder = document.createElement("p");
        pInDivBorder.className = "col-4";
        pInDivBorder.textContent = "Border";
        const inputInDivBorder = document.createElement("input");
        inputInDivBorder.className = "col-8 property";
        inputInDivBorder.type = "color";
        inputInDivBorder.value = figurita.border;
        inputInDivBorder.addEventListener("change", () => {
            figurita.border = inputInDivBorder.value;
            figuras[id] = figurita;
            updateFigures();
        });
        divRowBorder.appendChild(pInDivBorder);
        divRowBorder.appendChild(inputInDivBorder);
        divColBorder.appendChild(divRowBorder);
        divBorder.appendChild(divColBorder);
        atributosPanel.appendChild(divBorder);
    }

    if (figurita.tipo === "texto") {
        const textoSpan = document.createElement("span");
        textoSpan.textContent = "Propiedades";
        textoSpan.className = "fs-5 d-none d-sm-inline my-2";
        atributosPanel.appendChild(textoSpan);

        const divTexto = document.createElement("div");
        divTexto.className = "row container mt-2";
        const divColTexto = document.createElement("div");
        divColTexto.className = "col";
        const divRowTexto = document.createElement("div");
        divRowTexto.className = "row";
        const pInDivTexto = document.createElement("p");
        pInDivTexto.className = "col-4";
        pInDivTexto.textContent = "Texto";
        const inputInDivTexto = document.createElement("input");
        inputInDivTexto.className = "col-8 property";
        inputInDivTexto.type = "text";
        inputInDivTexto.value = figurita.texto;
        inputInDivTexto.addEventListener("change", () => {
            figurita.texto = inputInDivTexto.value;
            figuras[id] = figurita;
            updateFigures();
        });
        divRowTexto.appendChild(pInDivTexto);
        divRowTexto.appendChild(inputInDivTexto);
        divColTexto.appendChild(divRowTexto);
        divTexto.appendChild(divColTexto);
        atributosPanel.appendChild(divTexto);

        const divTextoSize = document.createElement("div");
        divTextoSize.className = "row container mt-2";
        const divColTextoSize = document.createElement("div");
        divColTextoSize.className = "col";
        const divRowTextoSize = document.createElement("div");
        divRowTextoSize.className = "row";
        const pInDivTextoSize = document.createElement("p");
        pInDivTextoSize.className = "col-4";
        pInDivTextoSize.textContent = "Tamaño";
        const inputInDivTextoSize = document.createElement("input");
        inputInDivTextoSize.className = "col-8 property";
        inputInDivTextoSize.type = "number";
        inputInDivTextoSize.value = figurita.grosor;
        inputInDivTextoSize.addEventListener("change", () => {
            figurita.grosor = Number(inputInDivTextoSize.value);
            figuras[id] = figurita;
            updateFigures();
        });
        divRowTextoSize.appendChild(pInDivTextoSize);
        divRowTextoSize.appendChild(inputInDivTextoSize);
        divColTextoSize.appendChild(divRowTextoSize);
        divTextoSize.appendChild(divColTextoSize);
        atributosPanel.appendChild(divTextoSize);
    }
    if (figurita.tipo === "linea") {
        const divLineaSize = document.createElement("div");
        divLineaSize.className = "row container mt-2";
        const divColLineaSize = document.createElement("div");
        divColLineaSize.className = "col";
        const divRowLineaSize = document.createElement("div");
        divRowLineaSize.className = "row";
        const pInDivLineaSize = document.createElement("p");
        pInDivLineaSize.className = "col-4";
        pInDivLineaSize.textContent = "Tamaño";
        const inputInDivLineaSize = document.createElement("input");
        inputInDivLineaSize.className = "col-8 property";
        inputInDivLineaSize.type = "number";
        inputInDivLineaSize.value = figurita.grosor;
        inputInDivLineaSize.addEventListener("change", () => {
            figurita.grosor = Number(inputInDivLineaSize.value);
            figuras[id] = figurita;
            updateFigures();
        });
        divRowLineaSize.appendChild(pInDivLineaSize);
        divRowLineaSize.appendChild(inputInDivLineaSize);
        divColLineaSize.appendChild(divRowLineaSize);
        divLineaSize.appendChild(divColLineaSize);
        atributosPanel.appendChild(divLineaSize);
    }
}

class Rectangulo {
    constructor(posX, posY, ancho, alto, relleno, border, color) {
        this.tipo = "rectangulo";
        this.posX = posX;
        this.posY = posY;
        this.ancho = ancho;
        this.alto = alto;
        this.relleno = relleno;
        this.border = border;
        this.visible = true;
        this.color = color;
        this.seleccionada = false;
    }
}
class Circulo {
    constructor(posX, posY, radio, relleno, border, color) {
        this.tipo = "circulo";
        this.posX = posX;
        this.posY = posY;
        this.radio = radio;
        this.relleno = relleno;
        this.border = border;
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
        this.grosor = 20;
        this.fuente = fuente;
        this.visible = true;
        this.seleccionada = false;
    }
}
class Linea {
    constructor(posX, posY, posX2, posY2, color) {
        this.tipo = "linea";
        this.posX = posX;
        this.posY = posY;
        this.posX2 = posX2;
        this.posY2 = posY2;
        this.grosor = 10;
        this.color = color;
        this.visible = true;
        this.seleccionada = false;
    }
}
