
//import geomerative.*;


PImage sourceImage;
PalmPrint imageProcessor;
PointCloudMaker cloudMaker;
ArrayList <ArrayList<PVector>> cloud;

int thresholdPercentage = 0;
boolean showOriginal = false;
boolean viewMesh = false;
String filter = "sin";
float camRadius;
float rotation =0;
float minZ = 0;
float maxZ = 20;
int density = 10;


void setup() {
  size(1200, 800, P3D);
  colorMode(HSB, 255);
  // Load image from hard drive
  sourceImage = loadImage(sketchPath() + "/img/gradient.jpg");

  // Create a new image processor
  imageProcessor = new PalmPrint(sourceImage);

  // filter source image with current filter
  imageProcessor.getContrastImage(filter);

  // Create a point cloud maker
  cloudMaker = new PointCloudMaker();

  // Create a point cloud with min and max point height
  cloudMaker.makeCloud(imageProcessor.getImgResult(), minZ, maxZ);

  // retrieve a cloud with density and elevation-filter parameters
  cloud = cloudMaker.getCloud(density, 0);

  // camera radius
  camRadius = 200;
}

void draw() {
  background(255);

  stroke(127, 255, 255);
  line(0, 0, 0, 100, 0, 0);
  stroke(0, 255, 255);
  line(0, 0, 0, 0, 100, 0);
  stroke(0);

  //// Show soruce and filtered image
  if (showOriginal) {
    imageProcessor.showOriginal();
  } else {
    //imageProcessor.show();
    if (viewMesh) {
      cloudMaker.showMesh(cloud, -sourceImage.width/2, -sourceImage.height/2);
    } else {
      cloudMaker.show(cloud, -sourceImage.width/2, -sourceImage.height/2);
    }
  }
  noFill();
  // show point cloud
  // cloudMaker.show(cloud, -width/2, -height/4);
  // *** This function works with cloud elevation-filter == 0 

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

  // Mesh or cloud
  if (key == 'm' || key == 'M') {
    viewMesh = !viewMesh;
    imageProcessor.getContrastImage(filter);
  }

  // Create a point cloud with min and max point height
  cloudMaker.makeCloud(imageProcessor.getImgResult(), minZ, maxZ);

  // retrieve a cloud with density and elevation-filter parameters
  cloud = cloudMaker.getCloud(density, 0);

  // SaveFile
  if (key == 'r' || key == 'R') {
    cloudMaker.saveToFile(cloud);
  }
}

void mouseDragged() {
  orbitControls();
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
  orbitControls();
}


void legend() {
  fill(0, 255, 255);
  text("Press O to switch betweeen original and filtered image", 10, 30);
  text("Press S to filter by sinusoid function", 10, 50);
  text("Press C to filter by chordal function", 10, 70);
  text("Press G to filter by sigmoid function", 10, 90);
}
