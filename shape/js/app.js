let canvas;
let ctx;
let canvasWidth;
let canvasHeight;
let centerX;
let centerY;
let sinValues = [];
let cosValues = [];
let figures = [];

window.onload = () => {
    initCanvas();
    calcTrig();
    document.getElementById("addPlanet").addEventListener("click", addPlanet);
    //onsole.table(multMatrix3(matrixA, matrixB));
};

initCanvas = () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    centerX = canvasWidth / 2;
    centerY = canvasHeight / 2;
    ctx.translate(centerX, centerY);
}



calcTrig = () => {
    for (let i = 0; i < 361; i++){
        sinValues.push(Math.sin(Math.PI / 180 * i));
    }

    for (let i = 0; i < 361; i++){
        cosValues.push(Math.cos(Math.PI / 180 * i));
    }
    addFigure();
    //rotateFiguresAroundZero();
}

addFigure = () => {
    figures.push(new shape(20));
}

addPlanet = () => {
    figures.push(new shape());
}

drawFigures = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

rotateFiguresAroundZero = () => {
    canvas.height = canvas.height;
    ctx.translate(centerX, centerY);
    for (let i = 0; i < figures.length; i++){
        figures[i].drawSelf();
    }
    //requestAnimationFrame(rotateFiguresAroundZero);
}
