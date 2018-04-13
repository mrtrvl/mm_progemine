let canvas;
let ctx;
let rectSize = 100;
let canvasWith;
let canvasHeiht;
let centerX;
let centerY;

window.onload = () => {
    initCanvas();
    testDraw();
};

initCanvas = () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvasWith = canvas.width;
    canvasHeiht = canvas.height;
    centerX = canvasWith / 2;
    centerY = canvasHeiht / 2;
}

testDraw = () => {
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#FF0000";
    ctx.fillStyle = "#FFBB00";
    //ctx.rect(centerX - rectSize / 2, centerY - rectSize / 2, rectSize, rectSize);
    
    ctx.rect(- rectSize / 2, - rectSize / 2, rectSize, rectSize);
    ctx.fill();
    ctx.stroke();
}