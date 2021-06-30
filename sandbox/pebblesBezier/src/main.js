/**
 * This code draws the silhoutte of pebbles for the SCD mural given a file of node values 
 * 
 * It has two render functions:
 * 
 * oneByOne() renders each pebbel animation in a sequence of still images saved ina png file. The use needs to enter the nodeIndex
 * of the pebbel to be rendered 
 */
let data;
let pebbles = [];

// Variables for png animation
let pG;
let cols = 10; // the number of columns in the final png file
let xPos = 0;
let yPos = 0;
let count = 3;
let nodeIndex // the node index to be rendered
let frameSize = 512;

//********  IMPORTANT  *******
let grassHopperOrPNG = false //     true means it is enabled for  grasshopper else for PNG

let main = function(p5) {

    // p5.preload = function () {
    //     // data = p5.loadTable("files/nodeValue_test01.csv",
    //     //     "csv", "header", input => { console.log(input); });
    //     p5.loadJSON("files/pebbles_network.json", input => {
    //         data = input
    //     })
    // }

    p5.setup = function() {
        p5.createCanvas(p5.displayWidth, 1200);
        main.pGinit();
        p5.textAlign(p5.CENTER);
        DOM.init();
    }

    /**
     * This function is invoked in DataWrangler
     */
    main.init = function() {

        data = DataWrangler.table;

        // Instantiation
        const count = 0
        for (let i = count; i < count + DataWrangler.table.getRowCount(); i++) {
            let temp = new Pebble(5);

            temp.axesSetup(
                200 + (360 * i), //  x position
                360, // y position
                frameSize / 2, //  length in pixels
                data.columns, // table headers
                100); // offset from the xy center
            temp.idSetup(data.rows[i]);
            pebbles.push(temp);
        }

        if (grassHopperOrPNG) {
            // Placement
            let nCol = 10
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < nCol; j++) {
                    // From 2D array to 1D array
                    let index = nCol * i + j
                    pebbles[index].setPositionAxes(
                        (frameSize / 2) + (frameSize * i),
                        (frameSize / 2) + (frameSize * j));
                }
            }
        } else {

            // Placement for PNG
            for (let i = 0; i < pebbles.length; i++) {
                pebbles[i].setPositionAxes((frameSize / 2), (frameSize / 2))
            }

            console.log("setup for PNG");
        }
    }

    main.pGinit = function() {
        let pgWidth = frameSize * cols
        let pgHeight = frameSize * 3
        pG = p5.createGraphics(pgWidth, pgHeight);
    }

    p5.draw = function() {

        if (grassHopperOrPNG) {
            allSilhouttes();
        } else {
            PNGSequence();
        }

    }

    function allSilhouttes() {
        p5.background(255);

        if (!DataWrangler.table) {
            p5.text("No data loaded yet", 100, 100)
        } else {

            for (let i = 0; i < pebbles.length; i++) {
                pebbles[i].displayRow2(p5, data.rows[i].obj);
            }
        }
    }


    /**
     * renders each pebbel animation in a sequence of still images saved ina png file. The use needs to enter the nodeIndex
     * of the pebbel to be rendered
     */
    function PNGSequence() {

        p5.clear(255);

        if (!DataWrangler.table) {
            p5.text("No data loaded yet", 100, 100)
        } else if (nodeIndex) {

            pebbles[nodeIndex].displayRow(pG, data.rows[nodeIndex].obj);

            // render image
            let fctr = pG.width / pG.height;
            p5.image(pG, 0, 0, pG.width / fctr, pG.height / fctr);

            xPos += frameSize;

            // translate canvas
            pG.translate(frameSize, 0);

            if (xPos % (frameSize * cols) == 0) {

                yPos += frameSize;

                pG.translate(-frameSize * cols, frameSize)

                count--;
            }

            if (count == 0) {
                p5.noLoop();

                if (window.confirm("PNG for pebble '" + pebbles[nodeIndex].innovationTitle + "' was rendered. Would you like to save the file?")) {

                    pG.save(pebbles[nodeIndex].innovationTitle + '.png');
                    console.log(pebbles[nodeIndex].innovationTitle + ".png file saved");
                }

            }

            pG.noFill();
            pG.stroke(0);
            pG.rect(xPos, yPos, frameSize, frameSize);
        }
    }
}

var gp5 = new p5(main, "model");