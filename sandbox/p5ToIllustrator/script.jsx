/**
 * Illustrator Scripting guide: https://illustrator-scripting-guide.readthedocs.io/
 */

// the Illustrator instance
ill = app;

// the document
doc = ill.activeDocument;

// draw path
addPath();

/**** TEXT FRAMES ****/
// Create a new text frame in the document.
function addText() {
  var textRef = doc.textFrames.add();
  textRef.top = 100;
  textRef.left = 200;
  // Add text content to the text frame.
  textRef.contents =
    "Application build number: " +
    app.buildNumber +
    ", application locale: " +
    app.locale;
}

// **** CREATING And Adding pathItems to A GROUP *****
function createGroup() {
  var group_ref = doc.groupItems.add();
  group_ref.pathItems.star(300, 250, 125, 40, 40, false);
  group_ref.pathItems.rectangle(0, 0, doc.width, 100);
}

// **** RECTANGLES *******
function addRecytangle() {
  var pathRef = doc.pathItems.rectangle(0, 0, doc.width, 100);
}

//**** COLOR SWATCHES *****/
// Create the new color for the swatch
function makeColorSwatch() {
  var cmykColor = new CMYKColor();
  cmykColor.cyan = 15;
  cmykColor.magenta = 50;
  cmykColor.yellow = 20;
  cmykColor.black = 5;

  // Create the new swatch using the above color
  var swatch = doc.swatches.add();
  swatch.color = cmykColor;
  swatch.name = "CreateSwatch";

  // Apply the swatch to a new path item
  // var pathRef = doc.pathItems.star(300, 300, 100, 30, 4, false);
  // pathRef.filled = true;
  // pathRef.fillColor = swatch.color;
  // pathRef.stroked = true;
  // pathRef.strokeColor = swatch.color;
}

//****** CURVE&&&&&&&& ******/
function addPath() {
  var curve = doc.pathItems.add();
  var curvePoint = curve.pathPoints.add();
  curvePoint.anchor = Array(0, 0);
  curvePoint.leftDirection = Array(-40, 0);
  curvePoint.rightDirection = Array(40, 0);
  curvePoint.pointType = PointType.SMOOTH;

  var curvePoint2 = curve.pathPoints.add();
  curvePoint2.anchor = Array(100, 100);
  curvePoint2.leftDirection = Array(60, 100);
  curvePoint2.rightDirection = Array(140, 100);
  curvePoint2.pointType = PointType.CORNER;

  var curvePoint3 = curve.pathPoints.add();
  curvePoint3.anchor = Array(200, 0);
  curvePoint3.leftDirection = Array(160, 0);
  curvePoint3.rightDirection = Array(240, 0);
  curvePoint3.pointType = PointType.CORNER;

  curve.filled = false;
  curve.stroked = true;
}

function addEdge(e) {

  // Get control points from json object
  var org = e.controlPoints.org;
  var orgControl = e.controlPoints.orgControl;
  var endControl = e.controlPoints.endControl;
  var end = e.controlPoints.end;

  // Create curve
  var curve = doc.pathItems.add();

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
  var reflectionMatrix = app.getScaleMatrix(100,-100);
  curve.transform(reflectionMatrix);
}

// Appends a new PathPoint to an existing path
// and initializes its anchor and handle points.
function addLine() {
  var line = doc.pathItems.add();
  line.stroked = true;
  line.setEntirePath(Array(Array(220, 475), Array(375, 300)));

  // Append another point to the line
  var newPoint = line.pathPoints.add();
  newPoint.anchor = Array(220, 300);
  newPoint.leftDirection = newPoint.anchor;
  newPoint.rightDirection = newPoint.anchor;
  newPoint.pointType = PointType.CORNER;
}

var edge = {
  edge: {
    source: {
      cluster: "1",
      index: 0,
      pajekIndex: 1,
    },
    target: {
      cluster: "1",
      index: 1,
      pajekIndex: 2,
    },
    kind: "Technology",
    weight: 1,
  },
  vSource: {
    id: 0,
    nodeLabel: "Vermillion River Observatory",
    nodeDescription:
      "Text: The Vermillion River Observatory was constructed thanks to the work of George Swenson, a professor of astronomy and electrical engineering. Swenson was in charge of creating an interdisciplinary program in radio astronomy research. The telescopes (a model of which is found in the case) helped scientists catalog interstellar data. They then used this data to analyze the molecular structure of interstellar gas.",
    nodeAttributes: {
      "Possible object": "The antennas at Vermillion River",
      "Primary ToI": "Technology",
      "Secondary ToI": "Methodology",
      "Tiertiary ToI": " ",
      URL: "https://distributedmuseum.illinois.edu/exhibit/george_swenson/",
      Observations: " ",
      College: "LAS, Engineering",
      Department: "Astronomy, Electrical Engineering",
      "Date or Decade": "1950s-1960s",
      Photograph:
        "https://archon.library.illinois.edu/index.php?p=digitallibrary/digitalcontent&id=8091",
      Faculty_Staff_Graduate_Undergrad: "Faculty",
      "Current Faculty research":
        "Erhan Kudeki? https://ece.illinois.edu/about/directory/faculty/erhan",
      Gender: " ",
      Other: " ",
    },
    connectors: ["Technology", " Methodology"],
    pajekIndex: 1,
    vNode: {
      posX: 335.9038060662022,
      posY: 556.1818181818184,
      posZ: 0,
      color: "#253493",
    },
  },
  vTarget: {
    id: 1,
    nodeLabel: "Photoelectric Photometer",
    nodeDescription:
      "i. Measuring a star’s brightness would take hours of observation and calculations. Astronomy professor Joel Stebbins in collaboration with physics professors F.C. Brown and Jakob Kunz would develop the photoelectric photometer which would use electricity to help simplify this process. \n \n ii. Stebbins credited his wife as the driving force for this idea. When they were first married she would sometimes go to the observatory with him to help him get his work done faster so they could spend more time together. He told her one day they would be able to do this much faster with electricity and from then on she encouraged him to discover this method. A couple of months later he went to a physics open house where F.C. Brown had a demonstration of a selenium cell. Stebbins worked with Brown to create a selenium cell photometer.\n \n iii. While the selenium cell photometer helped discover five new eclipsing binary stars, Stebbins felt it was not strong enough. He was introduced to Jakob Kunz, who had been working to improve photoelectric cells. They collaborated to create and continually refine the photoelectric photometer. This development allowed for stebbins to better research variable stars and he was able to measure diameters and masses more accurately than any other instrument had been able to provide up to that point.",
    nodeAttributes: {
      "Possible object": "Telescope or a star",
      "Primary ToI": "Technology",
      "Secondary ToI": " ",
      "Tiertiary ToI": " ",
      URL:
        "https://distributedmuseum.illinois.edu/exhibit/photoelectric_photometer/",
      Observations: " ",
      College: "LAS_Engineering",
      Department: "Astronomy/Physics",
      "Date or Decade": "1907-1920ish",
      Photograph:
        "https://archon.library.illinois.edu/index.php?p=digitallibrary/digitalcontent&id=6226",
      Faculty_Staff_Graduate_Undergrad: "Faculty",
      "Current Faculty research": " ",
      Gender: " ",
      Other: " ",
    },
    connectors: ["Technology"],
    pajekIndex: 2,
    vNode: {
      posX: 380.7272727272727,
      posY: 556.6515151515151,
      posZ: 0,
      color: "#09519c",
    },
  },
  controlPoints: {
    org: [330.9038060662022, 556.1818181818184, 0],
    orgControl: [355.81553939673745, 543.2277168499401, 0],
    endControl: [355.81553939673745, 543.6974138196368, 0],
    end: [380.7272727272727, 556.6515151515151, 0],
  },
};

addEdge(edge);


