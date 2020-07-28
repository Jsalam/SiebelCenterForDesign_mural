class PalmPrint {

  PImage myPrint;      //original image
  PImage rImage;       // resulting image
  float darkestPixel, lightestPixel, darkestPixelFinal, lightestPixelFinal, pixelGreyTemp; // values for evalueted the image.
  float opacity;

  PalmPrint(PImage thePrint) {
    myPrint = thePrint;
    darkestPixelFinal = 0;             //the darkest value on an image is 0
    lightestPixelFinal = 255;        //the lightest value on an image is 255
      //////// these are the parameters to determine the darkest pixel from the image
    darkestPixel = 255;             // we set the darkest pixel in white in order to upgrade this with a every darkest pixel
    lightestPixel = 255;           // because the paper we use has white, we asume that the lightest pixel will be 255
    pixelGreyTemp = 0;             // this value doesn't matter because it will allways be temporal 
    myPrint.loadPixels();       // load the original image

    for (int i = 0; i < (width*height) ; i++) {
      pixelGreyTemp = brightness(myPrint.pixels[i]);     // we use the brightness of the pixel as the 'grey value'
      if (pixelGreyTemp > 215) {                  // if the brightness is just a little grey
        myPrint.pixels[i] = color(0, 0, 255);     // we set it in white
      }
      if (pixelGreyTemp < darkestPixel) {       // if the grey in the current pixel is darkest that the one in memorry
        darkestPixel = pixelGreyTemp;          // it will be replace and...
        //we get the darkest point in the image.
      }
    }

    myPrint.updatePixels();
    image(myPrint, 0, 0);
    rImage = createImage(width, height, ARGB); // Create the empty resulting image
    /*
    So, when the object is created, we get, the darkest pixel instantly and the other values for creating the final image.
     */
  }


  void getContrastImage() { // with this method we create the resulting image.
    myPrint.loadPixels(); // load the original image.
    // tint(random(0, 255), random(0, 255), random(0, 255));

    for (int i = 0; i < (width*height) ; i++) {
      pixelGreyTemp = brightness(myPrint.pixels[i]); // find the grey in every pixel
      if (pixelGreyTemp == 255) {
        rImage.pixels[i] = color(0, 255, 255, 0); 
        /*
        because we filter the image when the object was creatted, we change the values in white
         in complete opacity.
         */
      }
      else {
        rImage.pixels[i] = color(sigmoidFilter(pixelGreyTemp, darkestPixel, lightestPixel, 0, 255));
        /*
        If the grey value of the pixel is different of 255 we process the pixel.
         Because the grey in the pixel is not completed black we contrast the image.
         
         For example, the initial range goes 120(has the darkeste point) and 255 (has the brightest)
         we put it from 0 to 255. to better result in the image. Contrast.
         */
      }
    }
    myPrint.updatePixels();
    // rImage.save("newImg.jpg");
  }

  void setTranparency(float myOpa) {
    myPrint.loadPixels();
    for (int i = 0; i < (width*height) ; i++) {
      //myOpa = 10;
      //if (pixelGreyTemp != 255) {
      rImage.pixels[i] = color(brightness(myPrint.pixels[i]), myOpa);
      //  }
    }
    myPrint.updatePixels();
  }

  PImage getImgResult() {
    return rImage;
  }

  void show() {  // print the image in the canvas.
    //image(rImage, 0, 0);
    //  tint(random(0, 255), random(0, 255), random(0, 255));
    image(rImage, 0, 0);
  }

  void showOriginal() {  // print the image in the canvas.
    //image(rImage, 0, 0);
    //  tint(random(0, 255), random(0, 255), random(0, 255));
    image(myPrint, 0, 0);
  }


  // we try two diferents "filters", two diferents formulas to contrast the image.

  // Filtro sinosoidal
  float filterSin(float val, float minE, float maxE, float minS, float maxS) {
    // Esta curva se puede hacer como un aerco perfecto usando la ecuancion del circulo cambiando la ecuancion de seno.
    float xp = map (val, minE, maxE, 0, PI/2);
    float y = sin(xp);
    float yp= map(y, 0, 1, minS, maxS);
    return yp;
  }

  // Filtro circular
  float filterCircular(float val, float minE, float maxE, float minS, float maxS) {
    // Esta curva se puede hacer como un arco perfecto usando la ecuancion del circulo cambiando la ecuación de seno.
    float xp = map (val, minE, maxE, 0, 1);
    float angulo =  -acos(xp);
    float y = sin(angulo);
    float yp= map(y, -1, 0, minS, maxS);
    return yp;
  }

  float sigmoidFilter(float val, float minE, float maxE, float minS, float maxS) {
    float alpha= 2550;
    float beta= 1220;
    float t = log(-((val-beta)/alpha));
   // print(val + "  " + minE + "  " + maxE+ "  " + t);
    float p = (maxS - minS)*(1/(1+t))+minS;
   // println ("  "+p);
    p=map(p, 1034, 9017, 0, 255);
    //println ("  "+p);
    return p;
  }
}

