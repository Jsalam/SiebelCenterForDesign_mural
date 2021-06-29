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

let grassHopperOrPNG = true // true means it is enabled for  grasshopper

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

        //  DOM.onLoadNetwork(data);
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
                200 + (360 * i),
                360,
                257.5,
                data.columns,
                130);
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
                        257.5 + (515 * i),
                        257.5 + (515 * j));
                }
            }
        } else {

            // Placement for PNG
            for (let i = 0; i < pebbles.length; i++) {
                pebbles[i].setPositionAxes(257.5, 257.5)
            }
        }
    }

    main.pGinit = function() {
        let pgWidth = 515 * cols
        let pgHeight = 515 * 3
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
            p5.text(pebbles.length, 100, 100)

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
        // p5.rect(0, 0, 515, 515);

        p5.clear(255);

        if (!DataWrangler.table) {
            p5.text("No data loaded yet", 100, 100)
        } else if (nodeIndex) {

            pebbles[nodeIndex].displayRow(pG, data.rows[nodeIndex].obj);

            // render image
            let fctr = pG.width / pG.height;
            p5.image(pG, 0, 0, pG.width / fctr, pG.height / fctr);

            xPos += 515;

            // translate canvas
            pG.translate(515, 0);

            if (xPos % (515 * cols) == 0) {

                yPos += 515;

                pG.translate(-515 * cols, 515)

                count--;
            }

            if (count == 0) {
                p5.noLoop();

                if (window.confirm("PNG for pebble '" + pebbles[nodeIndex].innovationTitle + "' was rendered. Would you like to save the file?")) {
                    pG.save(pebbles[nodeIndex].innovationTitle + '.png');
                    console.log(pebbles[nodeIndex].innovationTitle + ".png file saved");
                }


            }
        }
    }
}

var gp5 = new p5(main, "model");