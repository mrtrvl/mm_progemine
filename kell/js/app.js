let timeNow;
let hourNow;
let minuteNow;
let secondNow;
let animationRunFlag = false;
let animationCount = 0;
let animationToPlay;

window.onload = () => {
    tictac();
};

tictac = () => {
    timeNow = new Date();
    hourNow = timeNow.getHours();
    minuteNow = timeNow.getMinutes();
    secondNow = timeNow.getSeconds();

    animateClockHands();

    if (checkIfDividesWithFifteen(secondNow) && !animationRunFlag) {
        animationRunFlag = true;

        animationToPlay = chooseAnimation(animationCount);
        document.getElementById("kell").style.animation = animationToPlay + " 4s linear 1";

        animationCount ++;
    }

    animationCount = animationCount >= 4 ? 0 : animationCount;

    requestAnimationFrame(tictac);
}

animateClockHands = () => {
    document.getElementById("secondHand").style.transform = "rotate(" + secondNow * 6 + "deg)";
    document.getElementById("minuteHand").style.transform = "rotate(" + (minuteNow * 6 + secondNow / 10) + "deg)";
    document.getElementById("hourHand").style.transform = "rotate(" + (hourNow * 30 + minuteNow / 2) + "deg)";
}

checkIfDividesWithFifteen = (dataToDivide) => {
    if (dataToDivide % 15 == 0) {
        return true;
    } else {
        animationRunFlag = false;
        return false;
    }
}

chooseAnimation = (count) => {
    let animationName;

    if (count == 0) {
        animationName = "spin";
    } else if (count == 1) {
        animationName ="colour";
    } else if (count == 2) {
        animationName = "zoomInZoomOut";
    } else {
        animationName = "flip";
    }

    return animationName;
}