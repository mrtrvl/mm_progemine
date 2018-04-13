let timeNow;
let hourNow;
let minuteNow;
let secondNow;
let milliSecondsNow;
let animationRunFlag = false;
let animationCount = 0;
let animationToPlay;
let bell = new Audio("http://www.cs.tlu.ee/~rinde/media/soundid/kellaheli/kell.mp3");
let curHour;
let strikeCount;
let timeWords = [];
let timeSound;
let timeSoundUrl = "http://www.cs.tlu.ee/~rinde/media/soundid/kellaheli/";


window.onload = () => {
    curHour = new Date().getHours();
    document.getElementById("speak").addEventListener("click", tellTime);
    tictac();
};

tictac = () => {
    timeNow = new Date();
    hourNow = timeNow.getHours();
    minuteNow = timeNow.getMinutes();
    secondNow = timeNow.getSeconds();
    milliSecondsNow = timeNow.getMilliseconds();

    animateClockHands();

    //if (minuteNow == 43 && secondNow == 50 && milliSecondsNow < 1000 / 60) {
    if (curHour != hourNow) {
        strikeCount = hourNow > 12 ? 12 - hourNow : hourNow;
        bell.addEventListener("ended", bellStrike);
        bellStrike();
        curHour = hourNow;
    }

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

bellStrike = () => {
    if (strikeCount > 0) {
        bell.play();
        strikeCount --;
    } else {
        bell.removeEventListener("ended", bellStrike);
    }
}

tellTime = () => {
    timeWords.push("kellon");
    let timeNow = new Date();
    if (timeNow.getMinutes() == 0){
        timeSound.push("tapselt");
    }
    numToWords(timeNow.getHours());

    if (timeNow.getMinutes() > 0){
        timeWords.push("ja");
        numToWords(timeNow.getMinutes());
    
        if (timeNow.getMinutes() == 1) {
            timeWords.push("minut");
        } else {
            timeWords.push("minutit");    
    }
}
    timeSound = new Audio();
    timeSound.addEventListener("ended", speak);
    speak();
}

speak = () => {
    if (timeWords.length > 0) {
        timeSound.src = timeSoundUrl + timeWords[0] + ".mp3";
        timeSound.play();
        timeWords.shift();
    } else {
        timeSound.removeEventListener("ended", speak);
    }
}

numToWords = (num) => {
    if (num <= 10) {
        timeWords.push(num);
    } else {
        let tens = Math.floor(num / 10);
        let ones = num % 10;

        if (num > 10 && num < 20) {
            timeWords.push(tens);
            timeWords.push("teist");
        }

        if (num >= 20) {
            timeWords.push(tens);
            timeWords.push("kymmend");
            if (ones > 0) {
                timeWords.push(ones);
            }
        }
    }
}