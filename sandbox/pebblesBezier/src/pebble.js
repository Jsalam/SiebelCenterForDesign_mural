class Pebble {
    constructor(steps) {
        this.axes = [];
        this.steps = steps;
        this.angle = Math.PI * 2 / steps;
        this.armLength;

        this.valuesReady = false;

        // identification
        this.id;
        this.innovationTitle;
        this.theme;

        this._color;
        this._dominantColor;
        this._colorSteps = [];
        this.lastColorIndex = 0;
        this.nColors = 30; // nrow * nCols in the png array

        // centerpoint
        this.pos;

        // for JSON
        this.bezierPoints = {};

    }


    /**
     * Creating instances of each axis
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} length length in pixels
     * @param {object} labels table headers
     * @param {*} centerOffset offset from the xy center
     */
    axesSetup(x, y, length, labels, centerOffset) {
        this.pos = gp5.createVector(x, y);
        //InnovationTypes_A
        this.axes[0] = new Axis(0, 2, x, y, length, (this.angle * 0) - Math.PI / 2, labels[0 + 2], centerOffset);
        //,Colleges_B
        this.axes[1] = new Axis(0, 4, x, y, length, (this.angle * 1) - Math.PI / 2, labels[1 + 2], centerOffset);
        //,Departments_C
        this.axes[2] = new Axis(0, 5, x, y, length, (this.angle * 2) - Math.PI / 2, labels[2 + 2], centerOffset);
        //,Decade_D
        this.axes[3] = new Axis(1870, 2020, x, y, length, (this.angle * 3) - Math.PI / 2, labels[3 + 2], centerOffset);
        //,People_E
        this.axes[4] = new Axis(0, 4, x, y, length, (this.angle * 4) - Math.PI / 2, labels[4 + 2], centerOffset);
    }

    idSetup(data) {
        this.id = data.obj.ChronologicalValue;
        this.innovationTitle = data.obj.InnovationTitle;
        this.theme = data.obj.Theme;
        this._dominantColor = colorDictionary[this.theme.toString()];
        this._color = chroma(this._dominantColor).brighten(3).saturate(3);
        this._colorSteps = chroma.scale([this._color, this._dominantColor]).colors(this.nColors);

    }

    getColor() {
        let rtn;
        if (this.lastColorIndex < this._colorSteps.length) {
            rtn = gp5.color(this._colorSteps[this.lastColorIndex]);
            this.lastColorIndex++;

        } else {
            rtn = gp5.color(this._colorSteps[his._colorStepslength - 1]);
        }
        return rtn;
    }

    setValues(row) {
        if (!this.valuesReady) {
            this.axes[0].setValue(row.InnovationTypes_A);
            this.axes[1].setValue(row.Colleges_B);
            this.axes[2].setValue(row.Departments_C);
            this.axes[3].setValue(row.Decade_D);
            this.axes[4].setValue(row.People_E);
            this.valuesReady = true;
        }
    }

    /** Displaying row  values */
    displayRow(renderer, row) {

        this.setValues(row);

        let minVal = 0;

        for (const axis of this.axes) {
            let tmp = axis.update();
            if (tmp > minVal) {
                minVal = tmp;
            }
            //axis.show(renderer);
        }

        renderer.blendMode(renderer.BLEND);
        renderer.noStroke();

        this.bezierPoints = this.drawBezier(renderer, this.axes[0].valPosition, this.axes[1].valPosition,
            this.axes[2].valPosition, this.axes[3].valPosition,
            this.axes[4].valPosition, 45, this.getColor(), 250);

        renderer.blendMode(renderer.REMOVE);
        //renderer.blendMode(renderer.LIGHTEN);
        let myFill = renderer.color(0);
        let alfa = 10;

        this.drawBezier(renderer, this.axes[0].valPosition, this.axes[1].start,
            this.axes[2].start, this.axes[3].start,
            this.axes[4].start, 60, myFill, alfa);

        this.drawBezier(renderer, this.axes[0].start, this.axes[1].valPosition,
            this.axes[2].start, this.axes[3].start,
            this.axes[4].start, 60, myFill, alfa);

        this.drawBezier(renderer, this.axes[0].start, this.axes[1].start,
            this.axes[2].valPosition, this.axes[3].start,
            this.axes[4].start, 50, myFill, alfa);

        this.drawBezier(renderer, this.axes[0].start, this.axes[1].start,
            this.axes[2].start, this.axes[3].valPosition,
            this.axes[4].start, 45, myFill, alfa);

        this.drawBezier(renderer, this.axes[0].start, this.axes[1].start,
            this.axes[2].start, this.axes[3].start,
            this.axes[4].valPosition, 45, myFill, alfa);
    }

    /** Displaying row  values */
    displayRow2(renderer, row) {

        this.setValues(row);

        let minVal = 0;

        for (const axis of this.axes) {
            let tmp = axis.update();
            if (tmp > minVal) {
                minVal = tmp;
            }
            axis.show(renderer);
        }

        renderer.stroke(this._dominantColor);

        this.bezierPoints = this.drawBezier(renderer, this.axes[0].valPosition, this.axes[1].valPosition,
            this.axes[2].valPosition, this.axes[3].valPosition,
            this.axes[4].valPosition, 45, renderer.color(this._dominantColor), 10);
    }

    setPositionAxes(posX, posY) {
        this.pos.x = posX;
        this.pos.y = posY;
        for (const axes of this.axes) {
            axes.setPosition(posX, posY)
        }
    }

    drawBezier(renderer, p1, p2, p3, p4, p05, armLength, col, alfa) {
        this.armLength = armLength;
        let arm = gp5.createVector(0, armLength)
        let cp0 = gp5.createVector(p1.x, p1.y);
        let cp1 = gp5.createVector(p1.x, p1.y);
        let cp2 = gp5.createVector(p2.x, p2.y);
        let cp3 = gp5.createVector(p3.x, p3.y);
        let cp4 = gp5.createVector(p4.x, p4.y);
        let cp05 = gp5.createVector(p05.x, p05.y);

        for (var x = 0; x < 5; x++) {}
        // first control point
        arm.rotate(-Math.PI / 2);
        let cp1b = cp0.add(arm);

        // second A and B control point
        arm.rotate((gp5.PI + gp5.TWO_PI / this.steps));
        let cp2a = p5.Vector.add(cp2, arm);
        arm.rotate(gp5.PI)
        let cp2b = p5.Vector.add(cp2, arm);

        // third A and B control point
        arm.rotate(gp5.PI + gp5.TWO_PI / this.steps)
        let cp3a = p5.Vector.add(cp3, arm);
        arm.rotate(gp5.PI)
        let cp3b = p5.Vector.add(cp3, arm);

        // fourth A and B control point
        arm.rotate(gp5.PI + gp5.TWO_PI / this.steps)
        let cp4a = p5.Vector.add(cp4, arm);
        arm.rotate(gp5.PI)
        let cp4b = p5.Vector.add(cp4, arm);

        // fifth A and B control point
        arm.rotate(gp5.PI + gp5.TWO_PI / this.steps)
        let cp5a = p5.Vector.add(cp05, arm);
        arm.rotate(gp5.PI)
        let cp5b = p5.Vector.add(cp05, arm);

        // last control point
        arm.rotate(gp5.PI + gp5.TWO_PI / this.steps)
        let cp1a = cp1.add(arm);

        var vecsA = [cp2a, cp3a, cp4a, cp5a, cp1a];
        var vecsB = [cp1b, cp2b, cp3b, cp4b, cp5b];
        var vecsC = [p2, p3, p4, p05, p1];

        //renderer.stroke(20, 70);
        //renderer.noStroke();
        if (alfa) {
            col.setAlpha(alfa);
        }
        renderer.fill(col);
        renderer.beginShape();
        renderer.vertex(p1.x, p1.y);
        for (var i = 0; i < 5; i++) {
            renderer.bezierVertex(vecsB[i].x, vecsB[i].y, vecsA[i].x, vecsA[i].y, vecsC[i].x, vecsC[i].y);
        }
        renderer.endShape();

        // Lebel
        // renderer.noStroke();
        // renderer.fill(0, 100);
        // renderer.text(this.id + '\n' + this.innovationTitle, this.pos.x, this.pos.y + 120)

        // noFill();
        // renderer.stroke('orange');
        // renderer.line(p1.x, p1.y, cp1a.x, cp1a.y);
        // renderer.line(p2.x, p2.y, cp2a.x, cp2a.y);
        // renderer.line(p2.x, p2.y, cp2b.x, cp2b.y);
        // renderer.line(p3.x, p3.y, cp3a.x, cp3a.y);
        // renderer.line(p3.x, p3.y, cp3b.x, cp3b.y);
        // renderer.line(p4.x, p4.y, cp4a.x, cp4a.y);
        // renderer.line(p4.x, p4.y, cp4b.x, cp4b.y);
        // renderer.line(p05.x, p05.y, cp5a.x, cp5a.y);
        // renderer.line(p05.x, p05.y, cp5b.x, cp5b.y);
        // renderer.line(p1.x, p1.y, cp1b.x, cp1b.y);


        // For JSON
        var anchorsOrg = [p1, p2, p3, p4, p05];
        var anchorsEnd = [p2, p3, p4, p05, p1];
        return { "anchorsOrg": anchorsOrg, "anchorsEnd": anchorsEnd, "cPointsOrg": vecsA, "cPointsEnd": vecsB }
    }

    getJSON() {
        let rtn = {
            id: this.id,
            innovationTitle: this.innovationTitle,
            arm: this.armLength,
            center: { x: this.pos.x, y: this.pos.y },
            points: []
        };

        // points is a colecction of arrays of bezierPoints
        for (let i = 0; i < this.bezierPoints.anchorsOrg.length; i++) {

            let tmp = {
                orgX: this.bezierPoints.anchorsOrg[i].x,
                orgY: this.bezierPoints.anchorsOrg[i].y,
                orgControlX: this.bezierPoints.cPointsOrg[i].x,
                orgControlY: this.bezierPoints.cPointsOrg[i].y,
                endControlX: this.bezierPoints.cPointsEnd[i].x,
                endControlY: this.bezierPoints.cPointsEnd[i].y,
                endX: this.bezierPoints.anchorsEnd[i].x,
                endY: this.bezierPoints.anchorsEnd[i].y,
            }

            rtn.points.push(tmp)
        }

        return rtn;
    }
}