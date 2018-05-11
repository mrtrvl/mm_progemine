let canvas;
let ctx;
let canvasWidth;
let canvasHeight;
let centerX;
let centerY;
let figures = [];
let figuresCount = 5;


window.onload = () => {
    setup();
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
    //requestAnimationFrame(draw);
}

const createFigures = () => {
    for (let i = 0; i < figuresCount; i++){
        let coordinates = calculateCoordinates();
        let x = coordinates[0];
        let y = coordinates[1];

        let radius = getRadius(x, y);
        let figureToPush = new figure(x, y, radius)
        figures.push(figureToPush);
        figureToPush.draw();
    }
    draw();
}

const calculateCoordinates = () => {
    let x = Math.floor(Math.random() * canvas.width);
    let y = Math.floor(Math.random() * canvas.height);

    if (figures.length > 0){
        for (let i = 0; i < figures.length; i ++){
            if (figures[i].isInside(x, y)) {
                console.log(`Distance: ${ figures[i].distanceBetweenPoints(x, y) }`);
                calculateCoordinates();
            }
        }
    }
    return [x, y];
}

const drawFigures = () => {
    for (let i = 0; i < figures.length; i++){
        figures[i].draw();
    } 
}

const getRadius = (x, y) => {
    let radius;
    if (figures.length > 0) {
        radius = figures[0].distanceBetweenPoints(x, y) - figures[0].radius;
        for (let i = 0; i < figures.length; i ++){
            let radiusToCompare = figures[i].distanceBetweenPoints(x, y) - figures[i].radius
            if ((radiusToCompare < radius) && (radiusToCompare > 0)){
                radius = figures[i].distanceBetweenPoints(x, y) - figures[i].radius;
            }
        }
    } else {
        radius = Math.random() * 50;
    }
    return radius;
}

