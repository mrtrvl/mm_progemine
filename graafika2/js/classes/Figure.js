class figure {
    constructor (x = this.getRandomXCoordinate (), y = 0, size = this.getRandomSize (), rotationStep = this.getRandomRotationStep () ){
        this.x = x;
        this.y = y;
        this.size = size;
        this.points = [];
        this.angleAroundZero = parseInt(Math.random() * 360);
        this.rotationStep = rotationStep;
        this.createShape(this.getRandomCorners());
        //this.createPoints ();
    }

    createPoints () {
        this.points.push([this.x - this.size / 2, this.y - this.size / 2, 1]);
        this.points.push([this.x + this.size / 2, this.y - this.size / 2, 1]);
        this.points.push([this.x + this.size / 2, this.y + this.size / 2, 1]);
        this.points.push([this.x - this.size / 2, this.y + this.size / 2, 1]);
        this.drawSelf(this.points);
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

    getRandomCorners () {
        return parseInt(Math.random() * 20 + 3);
    }

    getRandomRotationStep () {
        return parseInt(Math.random() * 5 + 1);
    }

    getRandomSize () {
        return parseInt(Math.random() * 45 + 5);
    }
    
    getRandomXCoordinate () {
        return parseInt((Math.random() * ((canvas.width / 2) - (2 * sunSize))) + sunSize);
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

    rotateAroundGlobalZero () {
        let shiftToZeroMatrix = [
            [1, 0, 0],
            [0, 1, 0],
            [-this.x, -this.y, 1]
        ];

        let shiftBackToOriginMatrix = [
            [1, 0, 0],
            [0, 1, 0],
            [this.x, this.y, 1]
        ]

        let transformMatrixZ = this.getTransformMatrix("Z");

        let transformMatrixY = this.getTransformMatrix("X");

        let shiftToZeroAndRotate = multMatrix3(shiftToZeroMatrix, transformMatrixZ);
        let shiftRotatedBackToZero = multMatrix3(shiftToZeroAndRotate, shiftBackToOriginMatrix);

        return shiftRotatedBackToZero;
    }

    rotateAroundZero () {
        this.angleAroundZero += this.rotationStep;
        if (this.angleAroundZero > 360) {
            this.angleAroundZero = 0;
        }

        // teisendusmaatriks
        let transformMatrixZ = this.getTransformMatrix("Z");

        // uute punktide massiiv
        let currentPoints = [];
        let rotationMatrix = this.rotateAroundGlobalZero()

        for (let i = 0; i < this.points.length; i++) {
            let newPointAroundZ = multTransMatrix(this.points[i], rotationMatrix);
            currentPoints.push(newPointAroundZ);
        }

        let rotatedPoints = [];

        for (let i = 0; i < currentPoints.length; i++) {
            let newPointsAroundGlobalZero = multTransMatrix(currentPoints[i], transformMatrixZ);
            rotatedPoints.push(newPointsAroundGlobalZero);
        }


        this.drawSelf(rotatedPoints);
    }

    getTransformMatrix(axis) {
        if (axis == "X"){
            return [
                [1, 0, 0],
                [0, cosValues[this.angleAroundZero], sinValues[this.angleAroundZero]],
                [0, -sinValues[this.angleAroundZero], cosValues[this.angleAroundZero]]
            ];
        } else if (axis == "Y") {
            return [
                [cosValues[this.angleAroundZero], 0, sinValues[this.angleAroundZero]],
                [0, 1, 0],
                [-sinValues[this.angleAroundZero], 0, cosValues[this.angleAroundZero]]
            ];
        }else if (axis == "Z") {
            return [
                [cosValues[this.angleAroundZero], sinValues[this.angleAroundZero], 0],
                [-sinValues[this.angleAroundZero], cosValues[this.angleAroundZero], 0],
                [0, 0, 1]
            ];
        }
    }
}