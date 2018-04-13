let picUrl = "http://www.cs.tlu.ee/~rinde/media/fotod/tallinn600x450/";
let picNamePrefix = "tln_";
let picExt = ".JPG";
let maxPicNum = 183;
let picNum = 1;
let picCount = 1;

window.onload = () => {
    //randomPic();
    //setPic();
    document.getElementById("nextPic").addEventListener("click", nextPic);
    document.getElementById("prevPic").addEventListener("click", prevPic);
    //document.getElementById("tlnPic2").addEventListener("transitionend", showPicName);
};

randomPic = () => {
    picNum = Math.round(Math.random() * (maxPicNum - 1)) + 1;
    setPic(); 
}

setPic = () => {

    picCount ++;
    let picName = getPicName();
    if(picCount % 2 == 0) {
        document.getElementById("top").src = picName;
        document.getElementById("top").style.opacity = "1";
    } else {
        document.getElementById("bottom").src = picName;
        document.getElementById("top").style.opacity = "0";
    }
}

getPicName = () => {
    return picUrl + picNamePrefix + picNum + picExt;
}

nextPic = () => {
    if (picNum >= maxPicNum) {
        picNum = 1;
    } else {
        picNum ++;
    }
    setPic();
    picAnim("Next");
}

prevPic = () => {
    if (picNum <= 1) {
        picNum = maxPicNum;
    } else {
        picNum --;
    }
    setPic();
    picAnim("Prev");
}

picAnim = (dir) => {
    if(picCount % 2 == 0) {
        document.getElementById("top").style.animation = "minToMax" + dir + "  1s linear 1";
        document.getElementById("bottom").style.animation = "maxToMin" + dir + " 1s linear 1"
    } else {
        document.getElementById("bottom").style.animation = "minToMax" + dir + " 1s linear 1";
        document.getElementById("top").style.animation = "maxToMin" + dir + " 1s linear 1"
    }
}

showPicName = () => {
    document.getElementById("picNamePlace").innerHTML = getPicName();
}