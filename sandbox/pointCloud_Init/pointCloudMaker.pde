class PointCloudMaker {
  // Attributes
  PImage image;
  // ArrayList <PVector> points;
  PVector [][] points;

  // Constructor
  PointCloudMaker() {
    //points = new ArrayList <PVector>(); ?***** use this to get a better point distribution
  }

  void makeCloud(PImage image, float minZ, float maxZ) {
    points = new PVector [image.width][image.height]; 
    // save the image
    this.image = image;
    image.loadPixels();
    println (image.width+","+image.height);
    for (int i = 0; i < image.width; i++) {
      for (int j = 0; j < image.height; j++) {
        int pixelPos = i + (j * image.width);
        float pixelGreyTemp = brightness(image.pixels[pixelPos]);     // we use the brightness of the pixel as the 'grey value'
        // determine zValue
        float zValue = map (pixelGreyTemp, 0, 255, maxZ, minZ);
        // store PVector
        points[i][j] =new PVector(i, j, zValue);
      }
    }
    image.updatePixels();
  }


  /**
   Get point cloud with specifies density. O is the highest density. 
   */
  ArrayList <ArrayList<PVector>> getCloud(int density, float elevation) {

    int rows = points.length;
    int cols = points[0].length;

    // initiate the number of rows
    ArrayList <ArrayList<PVector>> output = new ArrayList();
    // 
    println (rows+","+cols);
    for (int i = 0; i < rows; i++) {

      // Initialize a new array
      if (i % density == 0) {

        ArrayList <PVector> tmp = new ArrayList <PVector> ();
        for (int j = 0; j < cols; j++) {
          if ( j % density == 0) {
            if (points[i][j].z >= elevation) {
              tmp.add(points[i][j]);
            }
          }
        }
        output.add(tmp);
      }
    }
    println("length: "+output.size());
    return output;
  }

  void show( ArrayList <ArrayList<PVector>> cloud, float orgX, float orgY ) {
    // println(cloud.length + "," +cloud[0].size());
    for (int i = 0; i< cloud.size(); i++) {
      for (PVector p : cloud.get(i)) {
        point(orgX + p.x, orgY+ p.y, p.z);
      }
    }
  }

  void showMesh( ArrayList <ArrayList<PVector>> cloud, float orgX, float orgY ) {
    // println(cloud.length + "," +cloud[0].size());
    for (int i = 0; i< cloud.size()-1; i++) {
      beginShape(TRIANGLE_STRIP);
      for (int j=0; j< cloud.get(i).size(); j++) {
        PVector p1 = cloud.get(i).get(j);
        PVector p2 = cloud.get(i+1).get(j);
        vertex(orgX + p1.x, orgY+ p1.y, p1.z);
        vertex(orgX + p2.x, orgY+ p2.y, p2.z);
      }
      endShape();
    }
  }

  void saveToFile( ArrayList <ArrayList<PVector>>cloud) {
    println("Saving cloud");
    Table table = new Table();
    table.addColumn("x");
    table.addColumn("y");
    table.addColumn("z");
    for (int i =0; i< cloud.size(); i++) {
      for (int j = 0; j < cloud.get(i).size(); j++) {
        TableRow newRow = table.addRow();
        newRow.setFloat("x", cloud.get(i).get(j).x);
        newRow.setFloat("y", cloud.get(i).get(j).y);
        newRow.setFloat("z", cloud.get(i).get(j).z);
      }
    }
    saveTable(table,"data/points.csv");
    println("file saved in data/points.csv");
  }
}
