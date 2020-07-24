let shpA = [];
let shpB = [];
let shpC = [];
let shpD = [];

function setup() {
    createCanvas(1200, 400);
    let xStep = 150;
    let yStep = 150;

    for (let i = 0; i < 13; i++) {
        let startX = 50;
        let startY = 50;
        shpA.push(new Shape(startX + i * xStep, startY));
    }

    for (let i = 0; i < 13; i++) {
        let startX = 125;
        let startY = 145;
        shpB.push(new Shape(startX + i * xStep, startY));
    }

    for (let i = 0; i < 13; i++) {
        let startX = 50;
        let startY = 240;
        shpC.push(new Shape(startX + i * xStep, startY));
    }

    for (let i = 0; i < 13; i++) {
        let startX = 125;
        let startY = 335;
        shpD.push(new Shape(startX + i * xStep, startY));
    }
}

function draw() {
    background(250);
    scale(0.5)
    noFill();

    for (const shape of shpA) {
        // shape.showCurveVertex();
        shape.showControls();
    }

    // for (const shape of shpB) {
    //     shape.showCurveVertex();
    //     shape.showControls();
    // }

    // for (const shape of shpC) {
    //     shape.showCurveVertex();
    //     shape.showControls();
    // }

    // for (const shape of shpD) {
    //     shape.showCurveVertex();
    //     shape.showControls();
    // }

    save("blobs.svg"); // give file name
    noLoop();
}

class Shape {
    constructor(x, y) {
        this.vertices = [];
        this.vertices.push(createVector(x + 30, y + 10));
        this.vertices.push(createVector(x + 80, y + 10));
        this.vertices.push(createVector(x + 80, y + 75));
        this.vertices.push(createVector(x + 40, y + 95));
        this.vertices.push(createVector(x + 10, y + 80));
        this.vertices.push(createVector(x + 0, y + 25));
        this.vertices.push(this.vertices[0]);
        this.randomize(-8, 8);
    }

    randomize(min, max) {
        for (const vertex of this.vertices) {
            vertex.add(new p5.Vector(random(min, max), random(min, max)))
        }
    }

    scale(factor) {
        for (const vertex of this.vertices) {
            vertex.setMag(factor);
        }
    }

    showBezierVertex() {
        stroke(0, 255, 0);
        beginShape();
        vertex(this.vertices[0].x, this.vertices[0].y);
        bezierVertex(this.vertices[1].x, this.vertices[1].y, this.vertices[2].x, this.vertices[2].y, this.vertices[3].x, this.vertices[3].y);
        bezierVertex(this.vertices[4].x, this.vertices[4].y, this.vertices[5].x, this.vertices[5].y, this.vertices[6].x, this.vertices[6].y);
        endShape();
    }

    showCurveVertex() {
        stroke(0, 0, 255);
        beginShape();
        curveVertex(this.vertices[0].x, this.vertices[0].y);
        curveVertex(this.vertices[0].x, this.vertices[0].y);
        curveVertex(this.vertices[1].x, this.vertices[1].y);
        curveVertex(this.vertices[2].x, this.vertices[2].y);
        curveVertex(this.vertices[3].x, this.vertices[3].y);
        curveVertex(this.vertices[4].x, this.vertices[4].y);
        curveVertex(this.vertices[5].x, this.vertices[5].y);
        curveVertex(this.vertices[6].x, this.vertices[6].y);
        curveVertex(this.vertices[0].x, this.vertices[0].y);
        endShape();
    }

    showControls() {
        // First section
        stroke(250, 25, 25);
        ellipse(this.vertices[0].x, this.vertices[0].y, 5);
        stroke(0, 125, 225);
        ellipse(this.vertices[1].x, this.vertices[1].y, 5);
        ellipse(this.vertices[2].x, this.vertices[2].y, 5);
        stroke(250, 25, 25);
        ellipse(this.vertices[3].x, this.vertices[3].y, 5);
        stroke(0, 125, 225, 70);
        line(this.vertices[0].x, this.vertices[0].y, this.vertices[1].x, this.vertices[1].y);
        line(this.vertices[1].x, this.vertices[1].y, this.vertices[2].x, this.vertices[2].y);
        line(this.vertices[2].x, this.vertices[2].y, this.vertices[3].x, this.vertices[3].y);
        // Second section
        stroke(250, 25, 25);
        ellipse(this.vertices[3].x, this.vertices[3].y, 5);
        stroke(0, 125, 225);
        ellipse(this.vertices[4].x, this.vertices[4].y, 5);
        ellipse(this.vertices[5].x, this.vertices[5].y, 5);
        stroke(250, 25, 25);
        ellipse(this.vertices[6].x, this.vertices[6].y, 5);
        stroke(0, 125, 225, 70);
        line(this.vertices[3].x, this.vertices[3].y, this.vertices[4].x, this.vertices[4].y);
        line(this.vertices[4].x, this.vertices[4].y, this.vertices[5].x, this.vertices[5].y);
        line(this.vertices[5].x, this.vertices[5].y, this.vertices[6].x, this.vertices[6].y);
    }
}