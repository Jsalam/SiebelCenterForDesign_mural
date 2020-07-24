let img;
let colorTiles;
let filterBySaturationTop, filterBySaturationBottom, inputHue, inputSaturation, inputLightness, BW, hairsBTN, savePNG;
let nTiles;
let offsetX, offsetY;
let hairs, monochromatic;
let randoms = [];

function preload() {
    img = loadImage("images/gravitationalNCSA.jpg");
}

function setup() {
    let canvas = createCanvas(img.width * 2, img.height * 2);
    canvas.position(300, 0)
    ellipseMode(CORNER);
    // set pixel density to low density displays
    pixelDensity(1);
    createP("Filter Top 50%")
    filterBySaturationTop = createSlider(50, 100, 100);
    createP("Filter Bottom 50%")
    filterBySaturationBottom = createSlider(0, 50, 0);
    createP("Tickness")
    inputHue = createSlider(5, 30, 5);
    createP("Length")
    inputSaturation = createSlider(0, 500, 30);
    createP("Orientation")
    inputLightness = createSlider(0, TWO_PI, TWO_PI);
    monochromatic = false;
    hairs = true;
    createP("Switch to greyscale")
    BW = createButton("B&W");
    BW.mousePressed(function() { monochromatic = !monochromatic });

    createP("Hide hairs")
    hairsBTN = createButton("Hairs");
    hairsBTN.mousePressed(function() { hairs = !hairs });

    createP("Save target")
    savePNG = createButton("Save PNG");
    savePNG.mousePressed(saveTarget);

    // process image
    nTiles = 30;
    let tiles = getTiles(img, nTiles);
    colorTiles = getColorTiles(tiles);

    // 
    offsetX = 200;
    offsetY = 200;

    createRandoms();

}

function saveTarget() {
    saveCanvas('target', 'png');
}

function createRandoms() {
    for (let i = 0; i < colorTiles.length; i++) {
        randoms.push(random(0.5, 3));
    }
}


function draw() {
    background(255);
    // image(img, 0, 0);
    noFill();
    //drawImageArray(img, tiles, nTiles);
    drawColorArray(img, colorTiles, nTiles);
    //noLoop();
    image(img, 0, 0, img.width / 10, img.height / 10);
}

function drawImageArray(img2, tiles, nTiles) {
    let tileWidth = img2.width / nTiles;
    let tileHeight = img2.height / nTiles;
    for (let y = 0; y < nTiles; y++) {
        for (let x = 0; x < nTiles; x++) {
            let index = x + (y * nTiles);
            //if (index % 2 == 0) {
            image(tiles[index], x * tileWidth, y * tileHeight);
            rect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
            //}
        }
    }
}


function drawColorArray(img2, colors, nTiles) {
    let tileWidth = img2.width / nTiles;
    let tileHeight = img2.height / nTiles;
    for (let y = 0; y < nTiles; y++) {
        for (let x = 0; x < nTiles; x++) {
            let index = x + (y * nTiles);
            //noStroke();
            //fill(colors[index]);
            //ellipse(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
            drawStroke(colors[index], offsetX + (x * tileWidth), offsetY + (y * tileHeight), randoms[index]);
        }
    }
}


function drawStroke(_color, x, y, randomVal) {

    // Thickness
    let t = map(_color._getHue(), 0, 360, 30, inputHue.value())
    strokeWeight(t * randomVal);
    strokeCap(ROUND);

    // Color
    let theFill = _color;
    if (monochromatic) {
        theFill = map(_color._getLightness(), 0, 100, 0, 255);
    }
    stroke(theFill);


    // Length
    let l = map(_color._getSaturation(), 0, 100, 10, inputSaturation.value());

    // Direction
    let angle = map(_color._getLightness(), 0, 100, 0, inputLightness.value());
    let dx = Math.cos(angle) * l;
    let dy = Math.sin(angle) * l;

    // draw line
    if (filterBySaturationBottom.value() < _color._getSaturation() && _color._getSaturation() < filterBySaturationTop.value()) {
        line(x, y, x + dx, y + dy);
        if (hairs) {
            if (monochromatic) {
                stroke(theFill, 70)
            } else {
                stroke(_color._getRed(), _color._getGreen(), _color._getBlue(), 70)
            }
            strokeWeight(4);
            line(x, y, x + dx * 10, y + dy * 10);
        }
    }
}

function getTiles(img2, nTiles) {
    let tmp = [];
    let tileWidth = img2.width / nTiles;
    let tileHeight = img2.height / nTiles;
    // select the image region
    // row
    for (let y = 0; y < nTiles; y++) {
        // columns
        for (let x = 0; x < nTiles; x++) {
            let region = img2.get(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
            tmp.push(region);
        }
    }
    return tmp;
}

function getColorTiles(tiles) {
    let rtn = [];
    for (const tile of tiles) {
        rtn.push(averageImageColors(tile));
    }
    return rtn;
}


function averageImageColors(section) {
    let colors = [];
    section.loadPixels();
    // columns 
    for (let column = 0; column < section.width; column++) {
        // rows
        for (let row = 0; row < section.height; row++) {
            // get pixel position in original image
            let position = (column + (section.width * row)) * 4;
            colors.push([
                section.pixels[position + 0],
                section.pixels[position + 1],
                section.pixels[position + 2]
            ]);
        }
    }
    section.updatePixels();
    let rtn = chroma.average(colors, 'rgb');
    rtn = color(rtn._rgb[0], rtn._rgb[1], rtn._rgb[2])
    return rtn;
}