let audioBtn;
let music = new Audio();
let musicURL = "sounds/Tuuletallajad.mp3";

// Web audio API

let context;    // Audiokontekst
let source;     // Sisend audiokonteksti jaoks
let audioBalanceRange;
let audioVolumeButton;
let balanceValue;
let volume;

let freqBandCount = 512;

let analyser;
let freqInfo;

let canvas;
let ctx;
let canvasWidth;
let canvasHeight;

let globalAngle = 0;

let oldCoordinates = [];

window.onload = () => {
    initAudio();
    initCanvas();
    createArray();
}

createArray = () => {
    for (let i = 0; i < freqBandCount / 2; i ++){
        oldCoordinates.push(new Array());
    }
}

initCanvas = () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    centerX = canvasWidth / 2;
    centerY = canvasHeight / 2;
    ctx.translate(centerX, centerY);
}

const initAudio = () => {
    audioBtn = document.getElementById("audioBtn");
    audioBalanceRange = document.getElementById("audioBalance");

    audioVolumeButton = document.getElementById("volumeBtn");

    audioBtn.addEventListener("click", audioButton);
    audioBalance.addEventListener("change", setBalanceValue);
    
    audioVolumeButton.addEventListener("change", setVolume);

    context = new window.AudioContext();
    balance = context.createStereoPanner();
    volume = context.createGain();

    analyser = context.createAnalyser();

    music.addEventListener("canplaythrough", musicLoaded);
    music.src = musicURL;
}

const audioButton = () => {
    toggleSound();
}

const musicLoaded = () => {
    music.removeEventListener("canplaythrough", musicLoaded);
    // Loome sisendi helifailist
    source = context.createMediaElementSource(music);
    // Juhime selle väljundisse
    source.connect(balance);
    balance.connect(volume);
    volume.connect(analyser);

    analyser.fftSize = freqBandCount;
    freqInfo = new Uint8Array(analyser.frequencyBinCount);
    
    volume.connect(context.destination);
    audioBtn.value = "Mängi";
}

const toggleSound = () => {
    if(music.paused) {
        source.mediaElement.play();
        audioBtn.value = "Vaiki";
        analyseSound();
    } else {
        source.mediaElement.pause();
        audioBtn.value = "Mängi";
    }
}

const setBalanceValue = (e) => {
    //balanceValue = audioBalanceRange.value;
    balance.pan.setTargetAtTime(e.target.value, context.currentTime, 0);
    console.log(e.target.value);
}

const setVolume = (e) => {
    volume.gain.setTargetAtTime(e.target.value, context.currentTime, 0);
    console.log(e.target.value);
}

const analyseSound = () => {
    globalAngle ++;

    globalangle = globalAngle > 359 ? 0 : globalAngle;
    let w = canvas.width / analyser.frequencyBinCount;

    canvas.width = canvas.width;
    ctx.translate(centerX, centerY);
    analyser.getByteFrequencyData(freqInfo);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    for (let i = 0; i < analyser.frequencyBinCount; i ++){
        let y = freqInfo[i] * 2;
        //ctx.strokeStyle = 'rgb(' + y + ', 0, 0)';
        //ctx.lineTo(i * w, y);
        let coordinateX = calculateCos(360 / analyser.frequencyBinCount * i + globalAngle) * (y / 2);
        let coordinateY = calculateSin(360 / analyser.frequencyBinCount * i + globalAngle) * (y / 2);
        //ctx.beginPath();
        ctx.strokeStyle = 'rgb(' + y + ', ' + i + ', '  + 0 + ')';
        //ctx.moveTo(0, 0);
        //ctx.lineTo(coordinateX, coordinateY);
        // ctx.fillStyle = "rgba(" + y + ", 0, 0, 1)";
        //ctx.fillRect(i * w, canvas.height - y - w, w, w);
        //ctx.fillRect(coordinateX, coordinateY, w, w);
        //ctx.closePath();
        //ctx.stroke();
        ctx.lineTo(coordinateX, coordinateY);
        drawCircle(coordinateX, coordinateY, 3);
        manageCoordinates(i, coordinateX, coordinateY, y / 2);
    }
    ctx.closePath();
    ctx.stroke();
    requestAnimationFrame(analyseSound);
}

calculateCos = (angle) => {
    return Math.cos(Math.PI / 180 * angle);
}

calculateSin = (angle) => {
    return Math.sin(Math.PI / 180 * angle);
}

drawCircle = (x, y, radius) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();
}

manageCoordinates = (i, x, y, distanceFromCenter) => {
    oldCoordinates[i].push({x: x, y: y, radius: distanceFromCenter});
    if (oldCoordinates[i].length > 20) {
        oldCoordinates[i].splice(0, 1);
    }
    let index = selectBiggestElementIndexFromArray(oldCoordinates[i]);
    drawCircle(oldCoordinates[i][index].x, oldCoordinates[i][index].y, 5);
}

selectBiggestElementIndexFromArray = (array) => {
    let biggestElement = 0;
    let biggestIndex = 0;
    for (let i = 0; i < array.length; i ++) {
        if (array[i].y > biggestElement) {
            biggestElement = array[i].y;
            biggestIndex = i;
        }
    }
    return biggestIndex;
}