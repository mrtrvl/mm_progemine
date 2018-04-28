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

window.onload = () => {
    initAudio ();
}

const initAudio = () => {
    audioBtn = document.getElementById("audioBtn");
    audioBalanceRange = document.getElementById("audioBalance");

    audioVolumeButton = document.getElementById("volumeBtn");

    audioBtn.addEventListener("click", audioButton);
    audioBalance.addEventListener("change", setBalanceValue);
    
    audioBalance.addEventListener("change", setVolume);

    context = new window.AudioContext();
    balance = context.createStereoPanner();
    volume = context.createGain();

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
    volume.connect(context.destination);
    audioBtn.value = "Mängi";
}

const toggleSound = () => {
    if(music.paused) {
        source.mediaElement.play();
        audioBtn.value = "Vaiki";
    } else {
        source.mediaElement.pause();
        audioBtn.value = "Mängi";
    }
}

const setBalanceValue = (e) => {
    //balanceValue = audioBalanceRange.value;
    balance.pan.setTargetAtTime(e.target.value, context.currentTime, 0);
    console.log(e.tagret.value);
}

const setVolume = (e) => {
    volume.gain.setTargetAtTime(e.target.value, context.currentTime, 0);
    console.log(e.target.value);
}