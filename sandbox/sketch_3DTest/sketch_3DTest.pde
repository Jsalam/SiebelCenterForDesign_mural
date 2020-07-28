ArrayList <ArrayList> lines;
Table table;


void setup() {
  size(1000, 400, P3D);

table = new Table();

  // lines
  lines = new ArrayList();
  for (int i = 0; i < 20; i++) {
    // dots
    int yPos = 10;
    int zPos = 10;
    int step = 10;
    ArrayList <PVector> dots; 
    table.addColumn("x");
    table.addColumn("y");
    table.addColumn("z");
 
    dots = new ArrayList();
    for (int j = 0; j < 100; j++) {
      TableRow newRow = table.addRow();
      PVector tmp = new PVector (j*step, i*yPos,  pow(j,2) * zPos);
      dots.add(tmp);
      newRow.setFloat(0,j*step);
      newRow.setFloat(1,i*yPos);
      newRow.setFloat(2,pow(j,2) * zPos);
    }
    lines.add(dots);
  }
  
  saveTable(table, "data/surfaceNew3.csv");
}

void draw() {
  background (0);
  stroke(255);
  translate(100,100);

  for (ArrayList dots : lines) {

    for (Object dot : dots) {
      PVector tmp = (PVector)dot;
      point(tmp.x, tmp.y, tmp.z);
    }
  }
}

void saveFile(){
}
