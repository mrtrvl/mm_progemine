let picUrl = "http://www.cs.tlu.ee/~rinde/media/fotod/tallinn600x450/";
let picNamePrefix = "tln_";
let picExt = ".JPG";
let maxPicNum = 183;
let picNum = 1;
let picCount = 1;

window.onload = () => {
    randomPic();
    document.getElementById("nextPic").addEventListener("click", nextPic);
    document.getElementById("prevPic").addEventListener("click", prevPic);
    document.getElementById("tlnPic2").addEventListener("transitionend", showPicName);
    document.getElementById("brightBtn").addEventListener("change", setFilter);
    document.getElementById("contrastBtn").addEventListener("change", setFilter);
    document.getElementById("saturateBtn").addEventListener("change", setFilter);
    document.getElementById("hueBtn").addEventListener("change", setFilter);
};

setFilter = () => {
    let filterset;
    filterSet = "brightness(" + document.getElementById("brightBtn").value + "%)";
    filterSet += " contrast(" + document.getElementById("contrastBtn").value + "%)";
    filterSet += " saturate(" + document.getElementById("saturateBtn").value + "%)";
    filterSet += " hue-rotate(" + document.getElementById("hueBtn").value + "deg)";

    document.getElementById("tlnPic1").style.filter = filterSet;
    document.getElementById("tlnPic2").style.filter = filterSet;
}

randomPic = () => {
    picNum = Math.round(Math.random() * (maxPicNum - 1)) + 1;
    setPic(); 
}

setPic = () => {

    let picName = getPicName();
    picCount ++;
    if(picCount % 2 == 0) {
        document.getElementById("tlnPic2").src = picName;
        document.getElementById("tlnPic2").style.opacity = "1";
    } else {
        document.getElementById("tlnPic1").src = picName;
        document.getElementById("tlnPic2").style.opacity = "0";
    }
}

getPicName = () => {
    return picUrl + picNamePrefix + picNum + picExt;
}

nextPic = () => {
    if (picNum > maxPicNum) {
        picNum = 1;
    } else {
        picNum ++;
    }
    setPic();
}

prevPic = () => {
    if (picNum < 1) {
        picNum = maxPicNum;
    } else {
        picNum --;
    }
    setPic();
}

showPicName = () => {
    document.getElementById("picNamePlace").innerHTML = getPicName();
}