let audioBtn;

// Web audio API

let context;    // Audiokontekst
let osc1;
let audioBalanceRange;
let audioVolumeButton;
let balanceValue;
let volume;
let audioBuffer;

let freq1 = 50;
let waveType1 = "sawtooth"; // sine, square, triangle, sawtooth

window.onload = () => {
    initAudio ();
}

const initAudio = () => {
    audioBtn = document.getElementById("audioBtn");
    audioBalanceRange = document.getElementById("audioBalance");
    audioVolumeButton = document.getElementById("volumeBtn");

    audioBtn.addEventListener("click", toggleSound);
    audioBalanceRange.addEventListener("change", setBalanceValue);
    audioVolumeButton.addEventListener("change", setVolume);

    context = new window.AudioContext();

    balance = context.createStereoPanner();
    volume = context.createGain();
}

const toggleSound = (e) => {
    if(e.target.value == "Pinise") {
        osc1 = context.createOscillator();
        osc1.frequency.setValueAtTime(freq1, context.currentTime, 0);
        osc1.type = waveType1;
        osc1.connect(balance);
        balance.connect(volume);
        volume.connect(context.destination);

        osc1.start();

        audioBtn.value = "Vaiki";
    } else {
        osc1.stop();
        audioBtn.value = "Pinise";
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