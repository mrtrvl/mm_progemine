let canvas;
let ctx;
let canvasWidth;
let canvasHeight;
let centerX;
let centerY;
let sinValues = [];
let cosValues = [];
let figures = [];
let sunSize = 50;
let planetCount = Math.random() * 10 + 1;
//let planetCount = 10000;

window.onload = () => {
    initCanvas();
    calcTrig();
    document.getElementById("addPlanet").addEventListener("click", addPlanet);
    document.getElementById("removePlanet").addEventListener("click", removePlanet);
    document.getElementById("planetCounter").addEventListener("change", planetCounter);
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
    rotateFiguresAroundZero();
}

addFigure = () => {
    figures.push(new figure(0, 0, sunSize, 1));

    for (i = 0; i < planetCount; i++){
        addPlanet();
    }
}

planetCounter = () => {
    let count = parseInt(document.getElementById("planetCounter").value);
    let planetCount = getPlanetCount();

    if (count > planetCount){
        for (let i = planetCount; i < count; i ++){
            addPlanet();
        }
    } else {
        for (let i = planetCount; i > count; i --) {
            removePlanet();
        }
    }
    showPlanetCount();
}

getPlanetCount = () => {
    return figures.length -1;
}

addPlanet = () => {
    figures.push(new figure());
    changePlanetCounterValue();
}

removePlanet = () => {
    if (figures.length > 1){
        figures.pop();
    }
    changePlanetCounterValue();
}

changePlanetCounterValue = () => {
    document.getElementById("planetCounter").value = getPlanetCount();
}

showPlanetCount = () => {
    let countString = figures.length > 2 ? " planets" : " planet";

    document.getElementById("planetCount").innerHTML = "1 sun and " + (figures.length - 1) + countString;
}

drawFigures = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

rotateFiguresAroundZero = () => {
    showPlanetCount ();

    canvas.height = canvas.height;
    ctx.translate(centerX, centerY);

    for (let i = 0; i < figures.length; i++){
        figures[i].rotateAroundZero();
    }
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