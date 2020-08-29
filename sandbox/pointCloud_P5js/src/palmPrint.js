class PalmPrint {
    constructor(thePrint) {
        this.myPrint = thePrint; // original image
        this.rImage; // resulting image
        this.darkestPixel = 255;
        this.lightestPixel = 255;
        this.darkestPixelFinal = 0;
        this.lightestPixelFinal = 255;
        this.pixelGreyTemp = 0;

        // get brightness
        this.myPrint.loadPixels();
        for (let i = 0; i < (this.myPrint.width * this.myPrint.height); i++) {
            this.pixelGreyTemp = globalP5.brightness(this.myPrint.pixels[i]); // we use the brightness of the pixel as the 'grey value'
            if (this.pixelGreyTemp < this.darkestPixel) { // if the grey in the current pixel is darkest that the one in memorry
                this.darkestPixel = this.pixelGreyTemp; // it will be replace and... we get the darkest point in the image.
            }
        }
        this.myPrint.updatePixels();

        this.rImage = globalP5.createImage(this.myPrint.width, this.myPrint.height); // Create the empty resulting image
    }

    /**
     * With this method we create the resulting image.
     */
    getContrastImage(filter) {
        this.myPrint.loadPixels(); // load the original image.
        this.rImage.loadPixels();
        let d = 1; //globalP5.pixelDensity()

        for (let i = 0; i < 4 * (d * this.myPrint.width) * (d * this.myPrint.height); i += 4) {
            let red = this.myPrint.pixels[i];
            let green = this.myPrint.pixels[i + 1];
            let blue = this.myPrint.pixels[i + 2];
            let alpha = this.myPrint.pixels[i + 3];
            let colorTemp = globalP5.color(red, green, blue, alpha);
            this.pixelGreyTemp = globalP5.brightness(colorTemp); // find the grey in every pixel
            let grey = 0;
            if (filter == "sin") {
                grey = Math.floor(this.filterSin(this.pixelGreyTemp, this.darkestPixel, this.lightestPixel, 0, 255));
            } else if (filter == "circular") {
                grey = Math.floor(this.filterCircular(this.pixelGreyTemp, this.darkestPixel, this.lightestPixel, 0, 255));
            } else if (filter == "sigmoid") {
                grey = Math.floor(this.filterSigmoid(this.pixelGreyTemp, this.darkestPixel, this.lightestPixel, 0, 255));
            }
            this.rImage.pixels[i] = grey;
            this.rImage.pixels[i + 1] = grey;
            this.rImage.pixels[i + 2] = grey;
            this.rImage.pixels[i + 3] = 255;
            /**
             * If the grey value of the pixel is different of 255 we process the pixel.
             * Because the grey in the pixel is not completed black we contrast the image.
             *
             * For example, the initial range goes 120(has the darkeste point) and 255 (has the brightest)
             * we put it from 0 to 255. to better result in the image. Contrast.
             */
        }
        this.rImage.updatePixels();
        this.myPrint.updatePixels();
        console.log("Image processed with filter " + filter);
    }

    // Filtro sinosoidal
    filterSin(val, minE, maxE, minS, maxS) {
        // Esta curva se puede hacer como un arco perfecto usando la ecuacion del circulo cambiando la ecuacion de seno.
        let xp = globalP5.map(val, minE, maxE, 0, globalP5.PI / 2);
        let y = Math.sin(xp);
        let yp = globalP5.map(y, 0, 1, minS, maxS);
        return yp;
    }

    // Filtro circular
    filterCircular(val, minE, maxE, minS, maxS) {
        let xp = globalP5.map(val, minE, maxE, 0, 1);
        let angulo = -Math.acos(xp);
        let y = Math.sin(angulo);
        let yp = globalP5.map(y, -1, 0, minS, maxS);
        return yp;
    }

    // Filtro sigmoideo
    filterSigmoid(val, minE, maxE, minS, maxS) {
        let alpha = 2550;
        let beta = 1220;
        let t = Math.log(-((val - beta) / alpha));
        // print(val + "  " + minE + "  " + maxE+ "  " + t);
        let p = (maxS - minS) * (1 / (1 + t)) + minS;
        //println ("  "+p);
        p = globalP5.map(p, 1034, 9017, 0, 255);
        //println ("  "+p);
        return p;
    }

    getImgResult() {
        return this.rImage;
    }

    show() { // print the image in the canvas.
        globalP5.image(this.rImage, 0, 0);
    }

    showOriginal() { // print the image in the canvas.
        globalP5.image(this.myPrint, 0, 0);
    }

}