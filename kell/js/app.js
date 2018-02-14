window.onload = () => {
    let timeNow;
    let hourNow;
    let minuteNow;
    let secondNow;

    tictac();
};

tictac = () => {
    timeNow = new Date();
    hourNow = timeNow.getHours();
    minuteNow = timeNow.getMinutes();
    secondNow = timeNow.getSeconds();

    animateClockHands();
    if (checkIfDividesWithFifteen(secondNow)) {
        console.log("Divides");
    }

    requestAnimationFrame(tictac);
}

animateClockHands = () => {
    document.getElementById("secondHand").style.transform = "rotate(" + secondNow * 6 + "deg)";
    document.getElementById("minuteHand").style.transform = "rotate(" + (minuteNow * 6 + secondNow / 10) + "deg)";
    document.getElementById("hourHand").style.transform = "rotate(" + (hourNow * 30 + minuteNow / 2) + "deg)";
}

checkIfDividesWithFifteen = (dataToDivide) => {
    return dataToDivide % 15 == 0 ? true : false;
}