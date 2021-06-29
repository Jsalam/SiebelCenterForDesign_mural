import java.util.*;

public class Blob {

  ArrayList <PVector> vertices;

  Blob(float x, float y) {
    vertices = new ArrayList<PVector>();
    vertices.add(new PVector(x + 30, y + 10));
    vertices.add(new PVector(x + 80, y + 10));
    vertices.add(new PVector(x + 80, y + 75));
    vertices.add(new PVector(x + 40, y + 95));
    vertices.add(new PVector(x + 10, y + 80));
    vertices.add(new PVector(x + 0, y + 25));
    vertices.add(vertices.get(0));
  }

  void randomize(float min, float max) {
    for (int i=0; i< vertices.size(); i++) {
      vertices.get(i).add(new PVector(random(min, max), random(min, max)));
    }
  }
 
    void showBezierVertex() {
        stroke(0, 255, 0);
        beginShape();
        vertex(vertices.get(0).x, vertices.get(0).y);
        bezierVertex(vertices.get(1).x, vertices.get(1).y, vertices.get(2).x, vertices.get(2).y, vertices.get(3).x, vertices.get(3).y);
        bezierVertex(vertices.get(4).x, vertices.get(4).y, vertices.get(5).x, vertices.get(5).y, vertices.get(6).x, vertices.get(6).y);
        endShape();
    }
  
     void showCurveVertex() {
        stroke(0, 0, 255);
        beginShape();
        curveVertex(vertices.get(0).x, vertices.get(0).y);
        curveVertex(vertices.get(0).x, vertices.get(0).y);
        curveVertex(vertices.get(1).x, vertices.get(1).y);
        curveVertex(vertices.get(2).x, vertices.get(2).y);
        curveVertex(vertices.get(3).x, vertices.get(3).y);
        curveVertex(vertices.get(4).x, vertices.get(4).y);
        curveVertex(vertices.get(5).x, vertices.get(5).y);
        curveVertex(vertices.get(6).x, vertices.get(6).y);
        curveVertex(vertices.get(0).x, vertices.get(0).y);
        endShape();
    }

  void showControls() {
    // First section
    stroke(250, 25, 25);
    ellipse(vertices.get(0).x, vertices.get(0).y, 5, 5);
    stroke(0, 125, 225);
    ellipse(vertices.get(1).x, vertices.get(1).y, 5, 5);
    ellipse(vertices.get(2).x, vertices.get(2).y, 5, 5);
    stroke(250, 25, 25);
    ellipse(vertices.get(3).x, vertices.get(3).y, 5, 5);
    stroke(0, 125, 225, 70);
    line(vertices.get(0).x, vertices.get(0).y, vertices.get(1).x, vertices.get(1).y);
    line(vertices.get(1).x, vertices.get(1).y, vertices.get(2).x, vertices.get(2).y);
    line(vertices.get(2).x, vertices.get(2).y, vertices.get(3).x, vertices.get(3).y);
    // Second section
    stroke(250, 25, 25);
    ellipse(vertices.get(3).x, vertices.get(3).y, 5, 5);
    stroke(0, 125, 225);
    ellipse(vertices.get(4).x, vertices.get(4).y, 5, 5);
    ellipse(vertices.get(5).x, vertices.get(5).y, 5, 5);
    stroke(250, 25, 25);
    ellipse(vertices.get(6).x, vertices.get(6).y, 5, 5);
    stroke(0, 125, 225, 70);
    line(vertices.get(3).x, vertices.get(3).y, vertices.get(4).x, vertices.get(4).y);
    line(vertices.get(4).x, vertices.get(4).y, vertices.get(5).x, vertices.get(5).y);
    line(vertices.get(5).x, vertices.get(5).y, vertices.get(6).x, vertices.get(6).y);
  }
}
