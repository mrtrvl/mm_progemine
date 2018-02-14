window.onload = () => {
    tictac();
};

tictac = () => {
    let timeNow = new Date();
    let hourNow = timeNow.getHours();
    let minuteNow = timeNow.getMinutes();
    let secondNow = timeNow.getSeconds();

    document.getElementById("secondHand").style.transform = "rotate(" + secondNow * 6 + "deg)";
    document.getElementById("minuteHand").style.transform = "rotate(" + (minuteNow * 6 + secondNow / 10) + "deg)";
    document.getElementById("hourHand").style.transform = "rotate(" + (hourNow * 30 + minuteNow / 2) + "deg)";

    requestAnimationFrame(tictac);
}