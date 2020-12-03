/**
 * EXTENDSCRIPT API REFERENCES
 * Javascript Tools Guide for Adobe: https://javascript-tools-guide.readthedocs.io/index.html
 * Note: Javascript version in ExtendScript: ES3. Does not take strict mode
 *
 * Illustrator Scripting guide: https://illustrator-scripting-guide.readthedocs.io/
 *
 * **** SETUP ****
 *
 * Some adobe products like Illustrator, Photoshop or After Effects are designed to read scripts that automate processess.
 * In essense, the scripts are written in a special form of JavaScript named ExtendScript. The syntax is JavaScript ES3,
 * so it is highly loose when it comes to declaring variables and accepting data types. It means that it does not run in
 * strict mode.
 *
 * The scripts could be opened directly from Illustrator (or other Adobe app) going to File/Scripts/ Other Scripts. The way
 * I am using this is by sendunf the code directly from Visual Studio Code (VSCode) to Illustrator. That is possible installing
 * the Adobe Script Runner extension in VSCode (Details in VSCode marketpalce). Once it is installed you can simple use
 * comman+shift+p to send the current file to any of the Adobe products.
 *
 * ExtendScript files have .jsx extension. In order to setup VSCode to debbug .jsx files you need to create a debugging
 * configuration (see https://www.youtube.com/watch?v=a90H-Pf61LQ).
 *
 * Scripting summary: https://www.youtube.com/watch?v=EGdgrP7azUQ
 *
 * **** WORKFLOW ****
 * 1. Export the JSON file from NetInt
 * 2. Create a script in ExtendedScript
 * 3. Point a global variable to that file
 * 4. Read and open the file
 * 5. Use eval to get the file content as objects
 * 6. Use Illustrator API to draw elements from the data acquired from the JSON file
 * 7. For debugging, connect Illustrator as a target application in VSCode (see bottom bar yellow text) and run scripts on Illustrator
 * 8. Send the script to Illustrator using the Adobe Script Runner extension (command+shift+p).
 * 9. Enjoy the paths and shapes in Illustrator
 */

/**
 * Illustrator uses points as the default unit. Below the conversions
 * centimeters	28.346 points = 1 centimeter
 * inches	72 points = 1 inch
 * millimeters	2.834645 points = 1 millimeter
 * picas	12 points = 1 pica
 * Qs	0.709 point = 1 Q (1 Q equals 0.23 millimeter)
 */

/**
 * In order to read files in ExtendScript you need to install this module: https://www.npmjs.com/package/extendscript-json.
 * That creates a anchor Module and setups the configuration.
 */
// This line is needed to read files
$.evalFile(
  "~/Documents/GitHub/Siebel%20Center%20for%20Design/mural_SCD/sandbox/p5ToIllustrator/node_modules/extendscript-json/index.jsx"
);

/********************************************* INITIALIZE ILLUSTRATOR *********************** */

// the document. App is Illustrator itself.
var doc = app.activeDocument;

/********************************************* IMPORT DATA *********************** */
// Use absolute path for the JSON file.
var root =
  "~/Documents/GitHub/Siebel%20Center%20for%20Design/mural_SCD/sandbox/p5ToIllustrator/";

var pathEdges = root + "files/vEdges.json";

var pathThemeF = root + "files/themeFlow (2).json";

var pathNodes = root + "files/5_network.json";

// read JSON FILE
var edgesData = readJSON(pathEdges);
var themeFlowData = readJSON(pathThemeF);
var nodesData = readJSON(pathNodes);

/********************************************* ADD LAYERS *********************** */

//create layers
createLayersFromNames(doc, [
  "Technology",
  "Methodology",
  "Process",
  "Knowledge framework",
  "Chords",
  "Ribbons",
]);

// add theme layers
for (var i = 0; i < nodesData.nodes.length; i++) {
  var layer = doc.layers.add();
  layer.name = nodesData.nodes[i].clusterLabel;

  // add layers for each node
  for (var j = 0; j < nodesData.nodes[i].nodes.length; j++) {
    var sublayer = layer.layers.add();
    sublayer.name = nodesData.nodes[i].nodes[j].nodeLabel;
  }
}

/********************************************* SET CHARACTER STYLES *********************** */

// Remove all character styles
doc.characterStyles.removeAll();

// Create a new character style
var labelCharStyle = doc.characterStyles.add("label");

// set character attributes
var charAttr = labelCharStyle.characterAttributes;
charAttr.size = 6;
charAttr.tracking = -50;

var redColor = new RGBColor();
redColor.red = 255;
redColor.green = 0;
redColor.blue = 0;
charAttr.fillColor = redColor;

// Description style
var descriptionCharStyle = doc.characterStyles.add("description");

// set character attributes
var charAttr2 = descriptionCharStyle.characterAttributes;
charAttr2.size = 4.5;
charAttr2.tracking = -50;

var grey = new RGBColor();
grey.red = 150;
grey.green = 150;
grey.blue = 150;
charAttr2.fillColor = grey;

/********************************************* ADD ELEMENTS TO LAYERS *********************** */

//draw nodes
// for (var i = 0; i < nodesData.nodes.length; i++) {
//   // get layer
//   var theme = nodesData.nodes[i];
//   var layer = doc.layers.getByName(theme.clusterLabel);
//   alert("Importing " + theme.nodes.length + " nodes from theme "+ theme.clusterLabel );
//   for (var j = 0; j < theme.nodes.length; j++) {
//     var nodeName = nodesData.nodes[i].nodes[j].nodeLabel;
//     if (nodeName) {
//       // get sublayer
//       var sublayer = layer.layers.getByName(nodeName);
//       // add node
//       addNode(sublayer, nodesData.nodes[i].nodes[j], { "label": labelCharStyle, "description": descriptionCharStyle});
//     }
//   }
// }

// //draw arcs
// for (var i = 0; i < edgesData.length; i++) {
//   var layer = doc.layers.getByName(edgesData[i].edge.kind);
//   addEdge(layer, edgesData[i]);
// }

// //draw chords
// for (var i = 0; i < themeFlowData.chords.length; i++) {
//   addChord(doc.layers.getByName("Chords"), themeFlowData.chords[i]);
// }

//draw ribbons
for (var i = 0; i < themeFlowData.ribbons.length; i++) {
  addRibbon(doc.layers.getByName("Ribbons"), themeFlowData.ribbons[i]);
}

/********************************************* FUNCTIONS *********************** */

function addNode(iLayer, node, charStyles) {
  var x = node.vNode.posX;
  var y = node.vNode.posY;
  var w = 10;
  var h = 10;
  var label = node.nodeLabel;
  var textContent = node.nodeDescription;

  // Create curve
  var circle = iLayer.pathItems.ellipse(y, x, w, h, false, true);
  // Set circle attributes
  circle.filled = true;
  circle.stroked = false;

  // Label
  var rectRef = iLayer.pathItems.rectangle(y - 15, x - 21.5, 43, 50);
  var labelText = iLayer.textFrames.areaText(rectRef);
  labelText.contents = label;
  labelText.selected = true;

  // Description
  rectRef = iLayer.pathItems.rectangle(y - 55, x - 21.5, 43, 150);
  var descriptionText = iLayer.textFrames.areaText(rectRef);
  descriptionText.contents = textContent;
  descriptionText.selected = true;

  // set label style
  if (charStyles.label) {
    charStyles.label.applyTo(labelText.textRange);
  }
  // Set description Style
  if (charStyles.description) {
    charStyles.description.applyTo(descriptionText.textRange);
  }
  //redraw();
}

/**
 * Creates a ribbon from a sequence of points
 * @param {*} iLayer the layer
 * @param {*} ribbon the sequence of points
 */
function addRibbon(iLayer, ribbon) {
  // Create curve
  var curve;
  if (iLayer) {
    curve = iLayer.pathItems.add();
  } else {
    curve = doc.pathItems.add();
  }

  for (var i = 0; i < ribbon.points.length; i++) {
    p = ribbon.points[i];

    var nextAnchor = curve.pathPoints.add();
    nextAnchor.anchor = Array(p.anchorX, p.anchorY);
    nextAnchor.leftDirection = Array(p.controlLeftX, p.controlLeftY);
    nextAnchor.rightDirection = Array(p.controlRightX, p.controlRightY);
    nextAnchor.pointType = PointType.SMOOTH;
  }

  // Set curve attributes
  curve.filled = false;
  curve.stroked = true;
}

/**
 * Creates a chord from a sequence of points
 * @param {*} iLayer the layer
 * @param {*} c the sequence of points
 */
function addChord(iLayer, chord) {
  // Create curve
  var curve;
  if (iLayer) {
    curve = iLayer.pathItems.add();
  } else {
    curve = doc.pathItems.add();
  }

  for (var i = 0; i < chord.points.length; i++) {
    // get one point
    var p = chord.points[i];

    // get point attributes
    var orgX = p.orgX;
    var orgY = p.orgY;
    // var orgControlX = p.orgControlX;
    // var orgControlY = p.orgControlY;
    // var endControlX = p.endControlX;
    // var endControlY = p.endControlY;
    var endX = p.endX;
    var endY = p.endY;

    // Add origin point to curve
    if (i == 0) {
      var firstAnchor = curve.pathPoints.add();
      firstAnchor.anchor = Array(orgX, orgY);
      firstAnchor.leftDirection = Array(orgX - chord.arm, orgY);
      firstAnchor.rightDirection = Array(orgX + chord.arm, orgY);
      firstAnchor.pointType = PointType.CORNER;

      // Add end point to curve
      var nextAnchor = curve.pathPoints.add();
      nextAnchor.anchor = Array(endX, endY);
      nextAnchor.leftDirection = Array(endX - chord.arm, endY);
      nextAnchor.rightDirection = Array(endX + chord.arm, endY);
      nextAnchor.pointType = PointType.SMOOTH;
    } else {
      // Add end point to curve
      var nextAnchor = curve.pathPoints.add();
      nextAnchor.anchor = Array(endX, endY);
      nextAnchor.leftDirection = Array(endX - chord.arm, endY);
      nextAnchor.rightDirection = Array(endX + chord.arm, endY);
      nextAnchor.pointType = PointType.SMOOTH;
    }

    // Set curve attributes
    curve.filled = false;
    curve.stroked = true;
  }
}

/**
 * Reads a JSON file ad returns a JSON object
 * */
function readJSON(file) {
  // Get file object
  var _file = File(file);

  // Open it before reading.
  _file.open("r");

  // Read and get the content
  var content = _file.read();

  //alert(content);

  // We got potentially harmful, yet useful, `eval` function.
  return eval("(" + content + ")");
}

/**
 * Create layer from a list of names
 * @param {*} iDoc illustrator file
 * @param {*} names array of names
 */
function createLayersFromNames(iDoc, names) {
  for (var i = 0; i < names.length; i++) {
    var tmp = iDoc.layers.add();
    tmp.name = names[i];
  }
}

/**
 * Adds an edge to the Illustrator document
 * @param {document} iLayer the Illustrator
 * @param {JSON} e json element
 */
function addEdge(iLayer, e) {
  // Get control points from json object
  var org = e.controlPoints.org;
  var orgControl = e.controlPoints.orgControl;
  var endControl = e.controlPoints.endControl;
  var end = e.controlPoints.end;

  // Create curve
  var curve = iLayer.pathItems.add();

  // Add origin point to curve
  var curvePoint = curve.pathPoints.add();
  curvePoint.anchor = Array(org[0], org[1]);
  curvePoint.leftDirection = Array(org[0], org[1]);
  curvePoint.rightDirection = Array(orgControl[0], orgControl[1]);
  curvePoint.pointType = PointType.CORNER;

  // Add end point to curve
  var curvePoint2 = curve.pathPoints.add();
  curvePoint2.anchor = Array(end[0], end[1]);
  curvePoint2.leftDirection = Array(endControl[0], endControl[1]);
  curvePoint2.rightDirection = Array(end[0], end[1]);
  curvePoint2.pointType = PointType.CORNER;

  // Set curve attributes
  curve.filled = false;
  curve.stroked = true;

  // transform curve
  // This martix is a reflection on x axis
  // var reflectionMatrix = app.getScaleMatrix(100, -100);
  // curve.transform(reflectionMatrix);
}
