let audioBtn;
let music = new Audio();
let musicURL = "sounds/trummar.mp3";

// Web audio API

let context;    // Audiokontekst
let source;     // Sisend audiokonteksti jaoks
let audioBalanceRange;
let audioVolumeButton;
let balanceValue;
let volume;
let audioBuffer;

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


    music.addEventListener("canplaythrough", musicLoaded);
    music.src = musicURL;
}

const musicLoaded = () => {
    music.removeEventListener("canplaythrough", musicLoaded);
    // Loome sisendi helifailist
    source = context.createBufferSource();
    // Juhime selle väljundisse
    source.connect(balance);
    balance.connect(volume);
    volume.connect(context.destination);
    audioBtn.value = "Mängi";
}

const toggleSound = (e) => {
    if(e.target.value == "Mängi") {
        source = context.createBufferSource();
        let request = new XMLHttpRequest();
        request.open("GET", musicURL, true);
        request.responseType = "arraybuffer";
        request.onload = () => {
            
            let audioData = request.response;
            context.decodeAudioData(audioData, (buffer) => {
                audioBuffer = buffer;
                source.buffer = audioBuffer;
                source.connect(balance);
                balance.connect(volume);
                volume.connect(context.destination);
                source.loop = true;
                source.playbackRate.value = 2;
            });
            source.start(0);
            audioBtn.value = "Vaiki";
        }
        request.send();

    } else {
        source.stop(0);
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