
import geomerative.*;


PImage sourceImage;
PalmPrint imageProcessor;
PointCloudMaker cloudMaker;
ArrayList <ArrayList<PVector>> cloud;

int thresholdPercentage = 0;
boolean showOriginal = false;
String filter = "sin";
float camRadius;

void setup() {
  size(800, 800, P3D);
  colorMode(HSB, 255);
  // Load image from hard drive
  sourceImage = loadImage(sketchPath() + "/img/arcs.jpg");

  // Create a new image processor
  imageProcessor = new PalmPrint(sourceImage);

  // filter source image with current filter
  imageProcessor.getContrastImage(filter);

  // Create a point cloud maker
  cloudMaker = new PointCloudMaker();

  // Create a point cloud with min and max point height
  cloudMaker.makeCloud(imageProcessor.getImgResult(), 0, 50);

  // retrieve a cloud with density and elevation-filter parameters
  cloud = cloudMaker.getCloud(6, 0);

  // camera radius
  camRadius = 800;
}

float rotation =0;

void draw() {
  background(255);
  orbitControls();


  stroke(127, 255, 255);
  line(0, 0, 0, 100, 0, 0);
  stroke(0, 255, 255);
  line(0, 0, 0, 0, 100, 0);
  stroke(0);

  //// Show soruce and filtered image
  //if (showOriginal) {
  //  imageProcessor.showOriginal();
  //} else {
  //  imageProcessor.show();
  //}
  // show point cloud
  //cloudMaker.show(cloud, -width/2, -height/4);
  cloudMaker.showMesh(cloud, -width/2, -height/4);
  // Print legend on canvas
  //legend();
}

void keyPressed() {
  // Original or filtered image
  if (key == 'o' || key == 'O') {
    showOriginal = !showOriginal;
  }
  // Filter Sinusoidal
  if (key == 's' || key == 'S') {
    filter = "sin";
    imageProcessor.getContrastImage(filter);
  }
  // Fiulter circular
  if (key == 'c' || key == 'C') {
    filter = "circular";
    imageProcessor.getContrastImage(filter);
  }

  // Filter sigmoid
  if (key == 'g' || key == 'G') {
    filter = "sigmoid";
    imageProcessor.getContrastImage(filter);
  }

  // SaveFile
  if (key == 'r' || key == 'R') {
    cloudMaker.saveToFile(cloud);
  }
}



void orbitControls() {
  // camera
  float xpos = map(mouseX, 0, width, -1, 1);
  float ypos = map(mouseY, 0, height, -1, 1);
  float distToCenter = dist(xpos, ypos, 0, 0);
  float altitude = acos(distToCenter);
  float zpos = sin(altitude);

  //println(distToCenter);

  camera(xpos * camRadius, ypos * camRadius, zpos * camRadius, 0, 0, 0, 0, 1, 0);
}

void mouseWheel(MouseEvent event) {
  // println(event.getCount());
  camRadius += event.getCount();
}


void legend() {
  fill(0, 255, 255);
  text("Press O to switch betweeen original and filtered image", 10, 30);
  text("Press S to filter by sinusoid function", 10, 50);
  text("Press C to filter by chordal function", 10, 70);
  text("Press G to filter by sigmoid function", 10, 90);
}
