// Polygon library
import geomerative.*;
//import org.apache.batik.svggen.font.table.*;
//import org.apache.batik.svggen.font.*;


PImage uploadPrintTemp;
PImage blendedImage, blackImage, finalImage;

File imagesPath;
String[] imagesNames;
ArrayList <PalmPrint> allPalms;
Boolean recPolygon;
float theOpacity;
ArrayList <RPoint> points;
ArrayList <Polygon> thePoly;
int controlMode, controlImage;
boolean controlMouse;
int thresholdPercentage = 0;

void setup() {
  size(800, 1200);
  colorMode(HSB, 255);
  

  controlMode = 0;
  controlImage = 0;
  try {
    imagesPath = new File("/Users/jsal/Documents/GitHub/Siebel Center for Design/mural_SCD/sandbox/huellasTestHSB/img_edited_Photoshop/jpg/");
    imagesNames = imagesPath.list();

    allPalms = new ArrayList <PalmPrint> ();
    theOpacity = 255/imagesNames.length;
  }
  catch(Exception e) {
    print("Double check the source path !!!!");
  }

  blendedImage = createImage(width, height, RGB);
  blackImage = createImage(width, height, RGB);
  finalImage = createImage(width, height, RGB);

  controlMouse = true;

  for (int i = 0 ; i < imagesNames.length ; i++) {
    if (!imagesNames[i].equals(".DS_Store")) {
      uploadPrintTemp = loadImage("/Users/jsal/Documents/GitHub/Siebel Center for Design/mural_SCD/sandbox/huellasTestHSB/img_edited_Photoshop/jpg/" + imagesNames[i]);     
      PalmPrint palmTemp = new PalmPrint(uploadPrintTemp);
      palmTemp.getContrastImage();
      palmTemp.setTranparency(theOpacity);
      palmTemp.show();
      allPalms.add(palmTemp);
    }
  }

  // blendedImage = uploadPrintTemp;

  background(0, 0, 255);
  for (int i = 0 ; i < allPalms.size() ; i++) {
    allPalms.get(i).show();
  }

  loadPixels(); 
  for (int x = 0; x < width; x++) {
    for (int y = 0; y < height; y++) {
      blendedImage.set(x, y, color(pixels[y*width+x]));
    }
  }
  updatePixels();

  /*
  blendedImage = allPalms.get(0).getImgResult();
   
   for (int i = 1 ; i < allPalms.size() ; i++) {
   PImage temp  = allPalms.get(i).getImgResult();
   image(temp,0,0);
   blendedImage.blend(temp, 0, 0, blendedImage.width, blendedImage.height, 0, 0, temp.width, temp.height, LIGHTEST);
   }
   */

  recPolygon = false;
  points = new ArrayList();
  thePoly = new ArrayList();
}

void draw() {
  background(0, 0, 255);
  switch(controlMode) {
  case 0:
    image(blendedImage, 0, 0);
    image(blackImage, 0, 0);
    if (controlMouse == true) {
      blendedImage.loadPixels();
      blackImage.loadPixels();
      float threshold = map(mouseX, 0, 800, 0, 255);
      for (int i = 0; i < width*height; i++) {
        if (brightness(blendedImage.pixels[i]) < threshold ) {
          blackImage.pixels[i] = color(0, 0, 0);
        }
        else {
          blackImage.pixels[i] = color(0, 0, 0, 0);
        }
      }
      thresholdPercentage = round(map(threshold, 0, 255, 0, 100));

      blendedImage.updatePixels();
      blackImage.updatePixels();
    }
    text("Visualizing pixels below "+thresholdPercentage+"% of opacity", 550, 30);
    break;
  case 1:
    allPalms.get(controlImage).showOriginal();
    break;
  }

  fill(4, 255, 255);

  // messagesn on screen
  if (!recPolygon) {
    text ("Press P to draw a polygon", 50, height-80);
  } 
  else {
    text ("click on the points and Press P to close the polygon ", 50, height-80);
    fill(4, 255, 255);
    noStroke();
    ellipse(30, 30, 20, 20);
  }
  textSize(10);
  text("Move the mouse to set the opacity threshold", 50, 30);
  text("Press - l - to lock the sensibility threshold", 50, height-65);
  text("Press - u - to unlock the sensibility threshold", 50, height-50);
  text("Press - m - to switch from result to browse mode", 50, height-35);
  text("In browse mode, press - i - to flip over images", 50, height-20);
  text("Press - s - to save the resulting image", 50, height-5);

  if (points.size()>0) {
    for (int i=0; i<points.size(); i++) {
      drawPoint(i);
    }
  }
  if (thePoly.size()>0) {
    for (int i=0; i<thePoly.size(); i++) {
      thePoly.get(i).show();
    }
  }
}

void keyPressed() {
  if (key == 'p') {
    recPolygon = !recPolygon;
    if (!recPolygon && points.size()!= 0) {
      thePoly.add(new Polygon(this, points));
      points.clear();
    }
  }
}

void keyReleased() {
  if (key == 's') {
    save("final.png");
    /*
    loadPixels();
     for (int x = 0; x < width; x++) {
     for (int y = 0; y < height; y++) {
     finalImage.set(x, y, color(pixels[y*width+x]));
     }
     }
     updatePixels();
     */
  }
  if (key == 'l') {
    controlMouse = false;
  }
  if (key == 'u') {
    controlMouse = true;
  }
  if (key == 'm') {
    controlMode = controlMode+=1;
    if (controlMode > 1) {
      controlMode = 0;
    }
  }
  if (key == 'i') {
    controlImage = controlImage+=1;
    if (controlImage > allPalms.size()-1) {
      controlImage = 0;
    }
  }
}

void mouseClicked() {
  if (recPolygon) {
    points.add(new RPoint(mouseX, mouseY));
  }
}

void drawPoint(int j) {
  stroke(116, 90, 200);
  fill(116, 90, 200, 100);
  ellipse(points.get(j).x, points.get(j).y, 10, 10);
}
