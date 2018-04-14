let canvas;
let ctx;
let rectSize = 100;
let canvasWidth;
let canvasHeight;
let centerX;
let centerY;
let sinValues = [];
let cosValues = [];
let horAxis = 250;
let sinusoidHeight = 90;
let counter = 0;

let square;

window.onload = () => {
    initCanvas();
    calcTrig();
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

class figure1 {
    constructor (x, y){
        this.x = x;
        this.y = y;
        this.size = 50;
        this.points = [];
        this.angleAroundZero = 0;
        this.createPoints();
    }

    createPoints () {
        this.points.push([this.x - this.size / 2, this.y - this.size / 2, 1]);
        this.points.push([this.x + this.size / 2, this.y - this.size / 2, 1]);
        this.points.push([this.x + this.size / 2, this.y + this.size / 2, 1]);
        this.points.push([this.x - this.size / 2, this.y + this.size / 2, 1]);

        this.drawSelf(this.points);
    }

    drawSelf (currentPoints) {
        ctx.beginPath();
        ctx.moveTo(currentPoints[0][0], currentPoints[0][1]);

        ctx.lineTo(currentPoints[1][0], currentPoints[1][1]);
        ctx.lineTo(currentPoints[2][0], currentPoints[2][1]);
        ctx.lineTo(currentPoints[3][0], currentPoints[3][1]);
        ctx.lineTo(currentPoints[0][0], currentPoints[0][1]);
        ctx.stroke();
    }

    rotateAroundZero () {
        this.angleAroundZero ++;
        if (this.angleAroundZero > 360) {
            this.angleAroundZero = 0;
        }

        // teisendusmaatriks
        let transformMatrixZ = [
                [cosValues[this.angleAroundZero], sinValues[this.angleAroundZero], 0],
                [-sinValues[this.angleAroundZero], cosValues[this.angleAroundZero], 0],
                [0, 0, 1]
            ];

        let transformMatrixX = [
                [1, 0, 0],
                [0, cosValues[this.angleAroundZero], sinValues[this.angleAroundZero]],
                [0, -sinValues[this.angleAroundZero], cosValues[this.angleAroundZero]]
            ];

        let transformMatrixY = [
                [cosValues[this.angleAroundZero], 0, sinValues[this.angleAroundZero]],
                [0, 1, 0],
                [-sinValues[this.angleAroundZero], 0, cosValues[this.angleAroundZero]]
            ];

        // uute punktide massiiv
        let currentPoints = [];

        for (let i = 0; i < this.points.length; i++) {
            let newPointAroundZ = multTransMatrix(this.points[i], transformMatrixZ);
            let newPointAroundY = multTransMatrix(newPointAroundZ, transformMatrixY);
            // let newPointAroundX = multTransMatrix(newPointAroundY, transformMatrixX);
            currentPoints.push(newPointAroundY);
        }

        this.drawSelf(currentPoints);
    }
}

calcTrig = () => {
    for (let i = 0; i < 361; i++){
        sinValues.push(Math.sin(Math.PI / 180 * i));
    }

    for (let i = 0; i < 361; i++){
        cosValues.push(Math.cos(Math.PI / 180 * i));
    }
    addFigure();
    //drawFigures();
    rotateFiguresAroundZero();
}

addFigure = () => {
    square = new figure1(0, 0);
}

drawFigures = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    //square.createPoints();
    //square.drawSelf();
}

rotateFiguresAroundZero = () => {
    canvas.height = canvas.height;
    ctx.translate(centerX, centerY);
    square.rotateAroundZero();
    //ctx.restore();
    //drawFigures();
    requestAnimationFrame(rotateFiguresAroundZero);
}

multTransMatrix = (a, b) => {
    let multMatrix = [];
    for(let i = 0; i < 3; i++){
        let multA = a[0] * b[0][i] + a[1] * b[1][i] + a[2] * b[2][i];

        multMatrix.push(multA);
    }
    return multMatrix;
 }

multMatrix3 = (a, b) => {
    let multMatrix = [];
    for(let i = 0; i < 3; i++){
        let multA = a[i][0] * b[0][0] + a[i][1] * b[1][0] + a[i][2] * b[2][0];
        let multB = a[i][0] * b[0][1] + a[i][1] * b[1][1] + a[i][2] * b[2][1];
        let multC = a[i][0] * b[0][2] + a[i][1] * b[1][2] + a[i][2] * b[2][2];
        multMatrix.push([multA, multB, multC]);
    }
    return multMatrix;
 }