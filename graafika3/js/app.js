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
    for (let i = 0; i < figuresCount; i ++){
        figures.push(new figure());
    }
    draw();
}

const drawFigures = () => {
/*     ctx.beginPath();
    for (let i = 0; i < figures.length; i ++){
        figures[i].move();
        if (i === 0){
            ctx.moveTo(figures[i].x, figures[i].y);
        } else {
            ctx.lineTo(figures[i].x, figures[i].y);
        }
        //figures[i].draw();
    }
    ctx.lineTo(figures[0].x, figures[0].y);
    ctx.closePath();
    ctx.stroke(); */
    for (let i = 0; i < figures.length; i ++){
        figures[i].move();
        figures[i].draw();
    }
}

