import processing.pdf.*;


Blob [] shpA;
Blob [] shpB;
Blob [] shpC;
Blob [] shpD;

void setup() {  
 size(1200, 300, PDF, "test.pdf");
 // size(1300, 600);

  int n = 30;

  shpA = new Blob[n]; 
  shpB = new Blob[n]; 
  shpC = new Blob[n]; 
  shpD = new Blob[n]; 
  int xStep = 150;


  for (int i = 0; i < shpA.length; i++) {
    int startX = 50;
    int startY = 50;
    Blob tmp = new Blob(startX + i * xStep, startY);
    tmp.randomize(-7, 7);
    shpA[i] = tmp;
  }

  for (int i = 0; i < shpB.length; i++) {
    int startX = 125;
    int startY = 145;
    Blob tmp = new Blob(startX + i * xStep, startY);
    tmp.randomize(-7, 7);
    shpB[i] = tmp;
  }

  for (int i = 0; i < shpC.length; i++) {
    int startX = 50;
    int startY = 240;
    Blob tmp = new Blob(startX + i * xStep, startY);
    tmp.randomize(-7, 7);
    shpC[i] = tmp;
  }

  for (int i = 0; i < shpD.length; i++) {
    int startX = 125;
    int startY = 335;
    Blob tmp = new Blob(startX + i * xStep, startY);
    tmp.randomize(-7, 7);
    shpD[i] = tmp;
  }
}

void draw() {
  background(255);
  scale(0.25);
  noFill();

  for (int i = 0; i < shpA.length; i++) {
    shpA[i].showCurveVertex();
    //shpA[i].showControls();
  }

  for (int i = 0; i < shpB.length; i++) {
    shpB[i].showCurveVertex();
    //shpB[i].showControls();
  }

  for (int i = 0; i < shpC.length; i++) {
    shpC[i].showCurveVertex();
   // shpC[i].showControls();
  }

  for (int i = 0; i < shpD.length; i++) {
    shpD[i].showCurveVertex();
    //shpD[i].showControls();
  }

  println("saved");
  exit();
  //noLoop();
}
