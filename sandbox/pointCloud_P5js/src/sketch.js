let init = function(p5) {
    let sourceImage;
    let imageProcessor;
    let filter = "sin";
    let camRadius;
    let cloud;
    let showOriginal = false;
    let myFont;
    let cloudMaker;
    let density = 5;
    let elevation = 0;

    p5.preload = function() {
        sourceImage = p5.loadImage("images/Layout.jpg");
        myFont = p5.loadFont("font/Roboto-Medium.ttf");
    }

    p5.setup = function() {
        p5.createCanvas(1000, 800, p5.WEBGL)

        p5.colorMode(p5.HSB, 255);

        // Create a new image processor
        imageProcessor = new PalmPrint(sourceImage);

        // filter source image with current filter
        imageProcessor.getContrastImage(filter);

        // Create a point cloud maker
        cloudMaker = new PointCloudMaker();

        // Create a point cloud with min and max point height
        cloudMaker.makeCloud(imageProcessor.getImgResult(), 0, 50);

        // retrieve a cloud with density and elevation-filter parameters
        cloud = cloudMaker.getCloud(density, elevation);

        // camera radius
        camRadius = 800;

        // font
        p5.textFont(myFont);

        //
        orbitControls(0, 0);
    };

    p5.draw = function() {
        p5.background(255);

        p5.stroke(127, 255, 255);
        p5.line(0, 0, 0, 100, 0, 0);
        p5.stroke(0, 255, 255);
        p5.line(0, 0, 0, 0, 100, 0);
        p5.stroke(0);

        // // Show soruce and filtered image
        if (showOriginal) {
            imageProcessor.showOriginal();
        } else {
            imageProcessor.show();
        }
        // // show point cloud
        p5.strokeWeight(p5.pixelDensity() / 2);
        //cloudMaker.show(cloud, -p5.width / 2, -p5.height / 4);
        // *** This function works with cloud elevation-filter == 0 
        cloudMaker.showMesh(cloud, -p5.width / 2, -p5.height / 4);
        // Print legend on canvas
        legend();
    }

    orbitControls = function(xpos, ypos) {
        // camera
        if (xpos != undefined && ypos != undefined) {
            p5.camera(xpos * camRadius, ypos * camRadius, 1 * camRadius, 0, 0, 0, 0, 1, 0);
        } else {
            let xpos = p5.map(p5.mouseX, 0, p5.width, -1, 1);
            let ypos = p5.map(p5.mouseY, 0, p5.height, -1, 1);
            let distToCenter = p5.dist(xpos, ypos, 0, 0);
            let altitude = p5.acos(distToCenter);
            let zpos = p5.sin(altitude);

            p5.camera(xpos * camRadius, ypos * camRadius, zpos * camRadius, 0, 0, 0, 0, 1, 0);
        }
    }

    p5.keyPressed = function() {
        // Original or filtered image
        if (p5.key == 'o' || p5.key == 'O') {
            showOriginal = !showOriginal;
        }
        // Filter Sinusoidal
        if (p5.key == 's' || p5.key == 'S') {
            filter = "sin";
            imageProcessor.getContrastImage(filter);
            // Create a point cloud with min and max point height
            cloudMaker.makeCloud(imageProcessor.getImgResult(), 0, 50);
            // retrieve a cloud with density and elevation-filter parameters
            cloud = cloudMaker.getCloud(density, elevation);
        }
        // Filter circular
        if (p5.key == 'c' || p5.key == 'C') {
            filter = "circular";
            imageProcessor.getContrastImage(filter);
            // Create a point cloud with min and max point height
            cloudMaker.makeCloud(imageProcessor.getImgResult(), 0, 50);
            // retrieve a cloud with density and elevation-filter parameters
            cloud = cloudMaker.getCloud(density, elevation);
        }

        // Filter sigmoid
        if (p5.key == 'g' || p5.key == 'G') {
            filter = "sigmoid";
            imageProcessor.getContrastImage(filter);
            // Create a point cloud with min and max point height
            cloudMaker.makeCloud(imageProcessor.getImgResult(), 0, 50);
            // retrieve a cloud with density and elevation-filter parameters
            cloud = cloudMaker.getCloud(density, elevation);
        }

        // SaveFile
        if (p5.key == 'r' || p5.key == 'R') {
            //  cloudMaker.saveToFile(cloud);
        }

    }

    p5.mouseWheel = function(event) {
        // println(event.getCount());
        camRadius += event.delta;
        orbitControls();
    }

    p5.mouseDragged = function() {
        orbitControls();
    }


    legend = function() {
        p5.fill(0, 255, 255);
        p5.text("Press O to switch betweeen original and filtered image", 10, 30);
        p5.text("Press S to filter by sinusoid function", 10, 50);
        p5.text("Press C to filter by chordal function", 10, 70);
        p5.text("Press G to filter by sigmoid function", 10, 90);
    }
}
let globalP5 = new p5(init, 'placeholder');