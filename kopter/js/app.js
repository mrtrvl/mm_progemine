let dirNum = 1;
let animRunning = true;
let copterAngle = -10;
let flyCount = 0;
let flyIterations = 1;

window.onload = () => {
    toggleAnimation();
    document.getElementById("animArea").addEventListener("animationiteration", animationEventOccured);
    document.getElementById("startAnimation").addEventListener("click", toggleAnimation);
    document.getElementById("flyCount").addEventListener("input", updateFlyInfo);
};

animationEventOccured = (event) =>{
    if(event.animationName == "liftOff" && event.type == "animationiteration"){
        flipCopter();
        document.getElementById("copter").style.animation = "flyLtr 5s linear infinite alternate";
    }

    if(event.animationName == "flyLtr" && event.type == "animationiteration") {
        flipCopter();
        flyCount ++;
        if (flyCount >= flyIterations) {
            disableSlider();
            document.getElementById("copter").style.animation = "touchDown 6s linear infinite";
        }
    }

    if(event.animationName == "touchDown" && event.type == "animationiteration") {
        document.getElementById("copter").style.animation = "liftOff 6s linear infinite alternate";
        toggleAnimation();
        enableSlider();
    }
}

startAnimation = () => {
    updateFlyInfo();
    toggleAnimation();
}

flipCopter = () => {
    dirNum *= -1;
    copterAngle *= -1;
    event.target.style.transform = "rotate(" + copterAngle +"deg) scale(" + dirNum + ", 1)";
}

toggleAnimation = () => {
    updateFlyInfo();
    let listOfChildren = document.getElementById("animArea").getElementsByTagName("*");
    if(animRunning) {
        for(let i = 0; i < listOfChildren.length; i++){
            listOfChildren[i].style.animationPlayState = "paused";
        }
    } else {
        for(let i = 0; i < listOfChildren.length; i++){
            listOfChildren[i].style.animationPlayState = "running";
        }
    }
    animRunning = !animRunning;
}

updateFlyInfo = () => {
    flyIterations = parseInt(document.getElementById("flyCount").value);
    document.getElementById("sliderOutput").innerHTML = "Iterations: " + flyIterations;
}

disableSlider = () => {
    document.getElementById("flyCount").disabled = true;
}

enableSlider = () => {
    document.getElementById("flyCount").disabled = false;
}