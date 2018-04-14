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

window.onload = () => {
    initCanvas();
    //testDraw();
    calcTrig();
    //sinusoid();
    drawOnSinusoid();
};

initCanvas = () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    centerX = canvasWidth / 2;
    centerY = canvasHeight / 2;
}

calcTrig = () => {
    for (let i = 0; i < 361; i++){
        sinValues.push(Math.sin(Math.PI / 180 * i));
    }

    for (let i = 0; i < 361; i++){
        cosValues.push(Math.cos(Math.PI / 180 * i));
    }
}

sinusoid = () => {
    ctx.lineWidth = 2;
    ctx.beginPath();
        ctx.moveTo(0, horAxis);
        ctx.lineTo(canvasWidth, horAxis);
        ctx.stroke();
        let limit = canvasWidth;
        ctx.moveTo(0, horAxis);
        for (let i = 0; i < limit; i++) {
            ctx.lineTo(i, horAxis - sinValues[i % 360] * sinusoidHeight);
        }
        ctx.stroke();
    ctx.closePath();
    
}

drawOnSinusoid = () => {
    canvas.width = canvas.width;
    sinusoid();
    ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.rect(counter - 5, horAxis - sinValues[counter % 360] * sinusoidHeight - 5, 10, 10);
        ctx.fill();
        ctx.stroke();
    ctx.closePath();
    counter ++;
    if (counter > canvasWidth) {
        counter = 0;
    }
    requestAnimationFrame(drawOnSinusoid);
}

testDraw = () => {
    ctx.save();
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#FF0000";
    ctx.fillStyle = "#FFBB00";
    ctx.save();
    //ctx.rect(centerX - rectSize / 2, centerY - rectSize / 2, rectSize, rectSize);
    ctx.translate(centerX, centerY);
    ctx.save();
    ctx.beginPath();
        ctx.rect(- rectSize / 2, - rectSize / 2, rectSize, rectSize);
        ctx.rotate(Math.PI / 180 * 30);
        ctx.rect(- rectSize / 2, - rectSize / 2, rectSize, rectSize);
        ctx.rotate(Math.PI / 180 * 30);
        ctx.rect(- rectSize / 2, - rectSize / 2, rectSize, rectSize);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    ctx.beginPath();
        ctx.strokeStyle = "#0000FF";
        ctx.rect(-20, -20, 40, 40);
        ctx.stroke();
    ctx.closePath();
    //ctx.fill();
}