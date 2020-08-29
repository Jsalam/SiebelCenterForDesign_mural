class PointCloudMaker {
    constructor() {
        // Attributes
        this.image;
        // ArrayList <PVector> points;
        this.points = [];

    }

    makeCloud(image, minZ, maxZ) {
        this.points = [];
        // save the image
        this.image = image;
        this.image.loadPixels();
        console.log(this.image.width + "," + this.image.height);
        for (let i = 0; i < this.image.width * 4; i += 4) {
            let tmp = [];
            for (let j = 0; j < this.image.height * 4; j += 4) {
                //let pixelPos = (i + (j * this.image.width *4));
                let pixelPos = (j * this.image.width) + i;

                let red = this.image.pixels[pixelPos];
                let green = this.image.pixels[pixelPos + 1];
                let blue = this.image.pixels[pixelPos + 2];
                let alpha = this.image.pixels[pixelPos + 3];
                let colorTemp = globalP5.color(red, green, blue, alpha);
                let pixelGreyTemp = globalP5.brightness(colorTemp); // find the grey in every pixel

                // determine zValue
                let zValue = globalP5.map(pixelGreyTemp, 0, 255, maxZ, minZ);
                // store PVector
                tmp[j / 4] = new globalP5.createVector(i / 4, j / 4, zValue);
            }
            this.points[i / 4] = tmp;
        }
        this.image.updatePixels();
    }

    /**
   Get point cloud with specifies density. O is the highest density. 
   */
    getCloud(density, elevation) {

        let rows = this.points.length;
        let cols = this.points[0].length;

        // initiate the number of rows
        let output = [];
        // console.log("this.points.length: " + rows + ", this.points[0].length: " + cols);
        for (let i = 0; i < rows; i++) {
            // Initialize a new array
            if (i % density == 0) {
                let tmp = [];
                for (let j = 0; j < cols; j++) {
                    if (j % density == 0) {
                        if (this.points[i][j].z >= elevation) {
                            tmp.push(this.points[i][j]);
                        }
                    }
                }
                output.push(tmp);
            }
        }
        // console.log("length: " + output.length);
        return output;
    }

    show(cloud, orgX, orgY) {
        //console.log(cloud.length + "," + cloud[0].length);
        for (let i = 0; i < cloud.length; i++) {
            for (let p of cloud[i]) {
                globalP5.point(orgX + p.x, orgY + p.y, p.z);
            }
        }
    }

    showMesh(cloud, orgX, orgY) {

        let rows = cloud[0].length;
        let cols = cloud.length;
        //console.log("Rows: " + rows + ", cols: " + cols);

        for (let col = 0; col < cols - 1; col++) {

            //globalP5.noFill();
            globalP5.beginShape(globalP5.QUADS);
            for (let row = 0; row < rows; row++) {
                let p1 = cloud[col][row];
                let p2 = cloud[col + 1][row];

                globalP5.vertex(orgX + p1.x, orgY + p1.y, p1.z);
                globalP5.vertex(orgX + p2.x, orgY + p2.y, p2.z);
            }
            globalP5.endShape();
        }
    }
}