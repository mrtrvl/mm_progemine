class figure {
    constructor (x, y, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    random (number) {
        return Math.random() * number;
    }

    calculateSinus (angle) {
        return Math.sin(Math.PI / 180 * angle);
    }

    calculateCosinus (angle) {
        return Math.cos(Math.PI / 180 * angle);
    }
   
    draw () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.closePath();
        ctx.stroke();
    }

    distanceBetweenPoints (x, y) {
        let distance = Math.sqrt(Math.abs(Math.pow(x - this.x, 2) - (Math.pow(y - this.y, 2))));
        return distance;
    }

    isInside (x, y) {
        if (this.distanceBetweenPoints(x, y) < this.radius) {
            return true;
        } else {
            return false;
        }
    }
}