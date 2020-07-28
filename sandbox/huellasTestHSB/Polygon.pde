class Polygon {
  private RPolygon poly;
  RPoint[] myPoints;
  PApplet theApplet;
  float areaCent,area;

  Polygon (PApplet theApplet, ArrayList <RPoint> thePoints) {
    
    areaCent = 0;
    area = 0;
    
    myPoints = new RPoint [thePoints.size()];
    for (int i=0; i<myPoints.length; i++) {
      myPoints[i] = thePoints.get(i);
    }
    this.theApplet = theApplet;
    poly = new RPolygon(myPoints);
    poly.addClose();
  }

  public float getArea() {
    return poly.getArea();
  }

  public void show() {
    fill(4,255,255,150);
    stroke(4,255,255);
    poly.draw(theApplet);
    area = getArea();
    areaCent = map(area , 0,  float( width*height ), 0 , 108.16);
    RPoint centroid = poly.getCentroid();
    fill(0,100,255);
    textAlign(CENTER);
    ellipse(centroid.x, centroid.y, 10, 10);
    fill(0,0,220);
    text("a= " + areaCent +" cm", centroid.x, centroid.y);
    text("X: " + int(centroid.x), centroid.x, centroid.y + 20);
    text("Y: " + int(centroid.y), centroid.x, centroid.y + 40);
    textAlign(LEFT);
  }
}

