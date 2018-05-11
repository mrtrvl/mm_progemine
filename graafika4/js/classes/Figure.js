class figure {
    constructor (angle){
        this.coordinateX;
        this.coordinateY;
        this.radius = this.random(150);
        this.angle = angle;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.distanceFromCenter = 50;
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
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.coordinateX, this.coordinateY);
        ctx.closePath();
        ctx.stroke();
    }

    move () {
        //this.radius = this.random(150);
        this.coordinateX = this.calculateCosinus(this.angle) * (this.radius + this.distanceFromCenter) + this.x;
        this.coordinateY = this.calculateSinus(this.angle) * (this.radius + this.distanceFromCenter) + this.y;
        this.radius += this.randomPositiveOrNegative();
    }

    randomPositiveOrNegative () {
        if (this.random(100) < 50) {
            return 1;
        } else {
            return -1;
        }
    }
}