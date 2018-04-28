class shape {
    constructor (corners){
        this.x = 0;
        this.y = 0;
        this.radius = 60;
        this.size = this.radius;
        this.points = [];
        this.corners = corners;
        this.createShape(this.corners);
        //this.createPoints ();
    }


    createShape (corners) {
        for (let i = 1; i < corners + 1; i ++) {
            let angle = parseInt(360 - i * (360 / corners));

            let locationX =  this. calculateCosinus(angle) * (this.size / 2) + this.x;
            let locationY = this.calculateSinus(angle) * (this.size / 2);
            this.points.push([locationX, locationY, 1]);
            locationX = this.calculateCosinus(angle - 360 / corners / 2) * (this.size / 4) + this.x;
            locationY = this.calculateSinus (angle - 360 / corners / 2) * (this.size / 4);
            this.points.push([locationX, locationY, 1]);
        }
        this.drawSelf(this.points);
    }

    calculateSinus (angle) {
        return Math.sin(Math.PI / 180 * angle);
    }

    calculateCosinus (angle) {
        return Math.cos(Math.PI / 180 * angle);
    }

    drawSelf (currentPoints) {
        ctx.beginPath();
        ctx.moveTo(currentPoints[0][0], currentPoints[0][1]);

        for (let i = 1; i < currentPoints.length; i ++) {
            ctx.lineTo(currentPoints[i][0], currentPoints[i][1]);
        }
    
        ctx.lineTo(currentPoints[0][0], currentPoints[0][1]);
        ctx.stroke();
    }

}