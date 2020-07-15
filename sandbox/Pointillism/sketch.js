let img, section;

let canvasWidth, canvasHeight;

let wStep, hStep, nWidth, nHeight;

let avgColors = [];

function preload() {
  img = loadImage("ptoMadero.jpg");
}

function setup() {
  createCanvas(img.width, img.height);
  ellipseMode(CORNER)
  // noStroke()
  console.log("w: " + img.width + ", h:" + img.height);

  // set pixel density to low density displays
  pixelDensity(1);

  // dimensions adjustment for high density displays
  nWidth = 30;
  nHeight = 21;
  wStep = img.width / nWidth;
  hStep = img.height / nHeight;
  // let areaW = 25 * pixelDensity();
  // let areaH = 25 * pixelDensity();
  canvasWidth = width * pixelDensity();
  canvasHeight = height * pixelDensity();

  // console.log("imgW: " + img.width + ", imgH:" + img.height);
  // console.log("canvasW: " + canvasWidth + ", canvasH:" + canvasHeight);
  // console.log("wStep: " + wStep + ", hStep:" + hStep);

  // create image container
  for (let i = 0; i < img.width; i += wStep) {
    let tmpRow = [];
    for (let j = 0; j < img.height; j += hStep) {
      section = getSection(img, 0, i, wStep, hStep);
      tmpRow.push(averageColors(section));
    }
    avgColors.push(tmpRow);
  }
  
  //console.log(avgColors)
}

function draw() {
  background(200);
  //image(img, 0, 0);
  for (let i = 0; i < avgColors[0].length; i++) {
    for (let j = 0; j < avgColors.length; j++) {
      // fill(avgColors[j][i]._rgb[0], avgColors[j][i]._rgb[1], avgColors[j][i]._rgb[2])
      ellipse(j * hStep, i * wStep, wStep, hStep);
      console.log(i+" "+j);
    }
  }
  //console.log(avgColors[0].length)
  //fill(avgColors[0][0]._rgb[0], avgColors[0][0]._rgb[1], avgColors[0][0]._rgb[2])
  //ellipse(100, 300, wStep, hStep);

  // image(section, 0, 0);

  // let section2 = getSection(img, mouseX, mouseY, wStep, hStep);
  // let clr = averageColors(section2);
  // fill(clr._rgb[0], clr._rgb[1], clr._rgb[2]);
  // ellipse(mouseX, mouseY, wStep, hStep);
  // image(section2, mouseX, mouseY);

}

function averageColors(src) {
  let colors = [];
  src.loadPixels();
  // columns 
  for (let column = 0; column < src.width; column++) {
    // rows
    for (let row = 0; row < src.height; row++) {
      // get pixel position in original image
      let position = (column + (src.width * row)) * 4;
      colors.push([
        src.pixels[position + 0],
        src.pixels[position + 1],
        src.pixels[position + 2]
      ])
    }
  }

  src.updatePixels();
  let rtn = chroma.average(colors);
  return rtn;
}

function getSection(src, x, y, w, h) {

  let imgSection = createImage(int(w), int(h));

  src.loadPixels();
  imgSection.loadPixels();

  // columns 
  for (let column = x; column < x + imgSection.width; column++) {

    // rows
    for (let row = y; row < y + imgSection.height; row++) {

      // get pixel position in original image
      let position = (column + (src.width * row)) * 4;

      // get pixel position in target image
      let positionSection = (column - x + (imgSection.width * (row - y))) * 4;

      // set the color pixel from the source image to the target image
      imgSection.pixels[positionSection + 0] = src.pixels[position + 0]; // red
      imgSection.pixels[positionSection + 1] = src.pixels[position + 1]; // green
      imgSection.pixels[positionSection + 2] = src.pixels[position + 2]; // blue
      imgSection.pixels[positionSection + 3] = src.pixels[position + 3]; // alpha

    }
  }

  // update the pixels array
  src.updatePixels()

  imgSection.updatePixels()

  return imgSection;
}