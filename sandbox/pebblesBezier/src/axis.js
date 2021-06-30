class Axis {
    constructor(min, max, posX, posY, length, angle, label, offset) {
        this.label = label;
        this.min = min;
        this.max = max;
        this.length = length;
        this.org = gp5.createVector(posX, posY);
        this.start = gp5.createVector(posX, posY);
        this.angle = angle;
        this.end = this.calcPosition(this.length);
        this.rawValue;
        this.value;
        this.valPosition;

        // offsetting the axes
        this.offset = offset;
        this.offsetVector = this.calcOffset(offset);
        this.start.add(this.offsetVector);

        // for animation
        this.animVal = 20; //-frameSize / 20;
    }

    setPosition(posX, posY) {
        this.org = gp5.createVector(posX, posY);
        this.start = gp5.createVector(posX, posY);
        this.end = this.calcPosition(this.length);
        this.start.add(this.offsetVector);
    }

    calcPosition(lngth) {
        let rtn;
        let x = Math.cos(this.angle) * lngth;
        let y = Math.sin(this.angle) * lngth;
        rtn = gp5.createVector(this.start.x + x, this.start.y + y);
        return rtn;
    }

    calcOffset(val) {
        let x = Math.cos(this.angle) * val;
        let y = Math.sin(this.angle) * val;
        return gp5.createVector(x, y);
    }

    setValue(val) {
        this.rawValue = val;
        this.value = gp5.map(val, this.min, this.max, 0, this.length - this.offset);

        anime({
            targets: this,
            animVal: function(anim) {
                return anim.value;
            },
            easing: 'easeOutQuart',
            duration: 2000
        })
    }

    update() {
        this.valPosition = this.calcPosition(this.animVal);
        return gp5.dist(this.org.x, this.org.y, this.valPosition.x, this.valPosition.y);
    }

    show() {
        //gp5.circle(this.start.x, this.start.y, 10, 10);
        gp5.stroke(200)
        gp5.fill(120);
        gp5.line(this.start.x, this.start.y, );
        gp5.line(this.valPosition.x, this.valPosition.y, this.end.x, this.end.y);
        gp5.circle(this.valPosition.x, this.valPosition.y, 5, 5);
        gp5.noStroke()
        gp5.text(this.label + '\n' + this.rawValue, this.end.x, this.end.y);
    }
}