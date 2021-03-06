/* let animRunning = false;
let imageAngle = 90;
let imageAngleRotateStep = 0.05;

window.onload = () => {
    document.getElementById("startAnimation").addEventListener("click", rotateImage);
    document.getElementById("pictureSelector").addEventListener("input", updatePictureName);
    setImageAngle();
    animation();
};

animation = () => {
    if (animRunning) {
        if (imageAngle > 0) {
            imageAngle -= imageAngleRotateStep;
            setImageAngle();
        }
    }
    requestAnimationFrame(animation);
}

rotateImage = () => {
    animRunning = !animRunning;
}

updatePictureName = () => {
    animRunning = false;
    imageAngle = 90;
    setImageAngle();
    imageName = document.getElementById("pictureSelector").value;
    document.getElementById("imageSrc").src = "images/" + imageName + ".jpg";
}

setImageAngle = () => {
    document.getElementById("image").style.transform = "rotateY(" + imageAngle +"deg)";
} */

window.onload = function() {
    // try to create a WebGL canvas (will fail if WebGL isn't supported)
    try {
        var canvas = fx.canvas();
    } catch (e) {
        alert(e);
        return;
    }

    // convert the image to a texture
    var image = document.getElementById('image');
    console.log(image);
    var texture = canvas.texture(image);

    // apply the ink filter
    canvas.draw(texture).ink(0.25).update();

    // replace the image with the canvas
    image.parentNode.insertBefore(canvas, image);
    image.parentNode.removeChild(image);

    // Note: instead of swapping the <canvas> tag with the <img> tag
    // as done above, we could have just transferred the contents of
    // the image directly:
    //
    //     image.src = canvas.toDataURL('image/png');
    //
    // This has two disadvantages. First, it is much slower, so it
    // would be a bad idea to do this repeatedly. If you are going
    // to be repeatedly updating a filter it's much better to use
    // the <canvas> tag directly. Second, this requires that the
    // image is hosted on the same domain as the script because
    // JavaScript has direct access to the image contents. When the
    // two tags were swapped using the previous method, JavaScript
    // actually doesn't have access to the image contents and this
    // does not violate the same origin policy.
};
