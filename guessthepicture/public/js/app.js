let animRunning = false;
let texture;
let canvas;
let angle;
let startAngle = 25;
let angleStep = 0.005;
let element;
let radiusOfSwirl;
let time = 0;
let stopper;
let stopWatchRunning = false;

window.onload = function() {
    document.getElementById("startAnimation").addEventListener("click", animatePicture);
    document.getElementById("pictureSelector").addEventListener("input", updatePictureName);
    animate(); 
};

animate = () => {
    if (animRunning) {
        if (angle > 0) {
            angle -= angleStep;
            updateCanvas();
            if (!stopWatchRunning) {
                stopWatch();
                stopWatchRunning = true;
            }
        }
        updateStopperOnPage();
    } else {
        clearInterval(stopper);
        stopWatchRunning = false;
    }
    requestAnimationFrame(animate);
}

animatePicture = () => {
    animRunning = !animRunning;
}

getElement = (imageName) => {
    time = 0;
    angle = startAngle;
    updateStopperOnPage();
    document.getElementById("startAnimation").disabled = false;
    animRunning = false;
    imageSrc = "images/" + imageName + ".jpg";
    elem = document.createElement("img");
    elem.setAttribute("src", imageSrc);
    elem.setAttribute("id", "image");
    elem.setAttribute("style", "display: none");
    return elem;
}

updatePictureName = async () => {
    try {
        removeOldCanvas();

        imageSrc = document.getElementById("pictureSelector").value;
        let elem = await getElement(imageSrc);
        document.getElementById("placehere").appendChild(elem);
        document.getElementById("image").addEventListener("load", imageLoaded);

    } catch (error) {
        console.log(error);
    }
}

loadTexture = (image) => {
    texture = canvas.texture(image);
    return texture;
}

createCanvas = async () => {
    try {
        canvas = fx.canvas();

        let image = document.getElementById("image");
        
        texture = await loadTexture(image);
        
        radiusOfSwirl = texture._.height > texture._.width ? texture._.height : texture._.width;

        updateCanvas();

        image.parentNode.insertBefore(canvas, image);
        image.parentNode.removeChild(image);

    } catch (error) {
        console.log(error);
        return;
    }
}

removeOldCanvas = () => {
    let myNode = document.getElementById("placehere");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

updateCanvas = () => {
    canvas.draw(texture).swirl(texture._.width / 2, texture._.height / 2, radiusOfSwirl * 2, angle).update();
}

imageLoaded = () => {
    createCanvas();
}

stopWatch = () => {
    stopper = setInterval(() => {
        time += 0.1;
    }, 10);
}

updateStopperOnPage = () => {
    document.getElementById("stopWatch").innerHTML = "Aeg: " + time;
}