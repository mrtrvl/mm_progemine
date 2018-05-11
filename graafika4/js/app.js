let canvas;
let ctx;
let canvasWidth;
let canvasHeight;
let centerX;
let centerY;
let figures = [];
let figuresCount = 10;


window.onload = () => {
    setup();

    document.getElementById("addPlanet").addEventListener("click", addPlanet);
    document.getElementById("removePlanet").addEventListener("click", removePlanet);
    document.getElementById("planetCounter").addEventListener("change", planetCounter);
    //onsole.table(multMatrix3(matrixA, matrixB));
};

const setup = () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    centerX = canvasWidth / 2;
    centerY = canvasHeight / 2;
    createFigures();
}

const draw = () => {
    canvas.height = canvas.height;
    drawFigures();
    requestAnimationFrame(draw);
}

const createFigures = () => {
    for (let i = 0; i < 360; i ++){
        figures.push(new figure(i));
    }
    draw();
}

const drawFigures = () => {
    ctx.beginPath();
    ctx.moveTo(figures[0].coordinateX, figures[0].coordinateY);
    for (let i = 1; i < figures.length; i ++){
        figures[i].move();
        //figures[i].draw();
        ctx.lineTo(figures[i].coordinateX, figures[i].coordinateY);
    }
    ctx.lineTo(figures[0].coordinateX, figures[0].coordinateY);
    ctx.closePath();
    ctx.stroke();
}

