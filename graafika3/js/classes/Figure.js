class figure {
    constructor (){
        this.distanceX = this.random(300);
        this.distanceY = this.random(300);
        this.radius = 5;
        this.angle = this.random(360);
        this.x;
        this.y;
    }

    random (number) {
        return Math.random() * number;
    }

    randomPositiveOrNegative () {
        if (this.random(100) < 50) {
            return 1;
        } else {
            return -1;
        }
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

    move () {
        this.distanceX += (this.random(4) * this.randomPositiveOrNegative());
        this.distanceY +=( this.random(4) * this.randomPositiveOrNegative());
        this.angle ++;
        this.angle = this.angle > 360 ? 0 : this.angle;

        this.x = this.calculateCosinus(this.angle) * this.distanceX + centerX;
        this.y = this.calculateSinus(this.angle) * this.distanceY + centerY;
    }
}