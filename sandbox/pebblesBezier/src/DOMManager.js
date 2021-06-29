class DOM {
    // This constructor is not needed, but it is here because the documentation generatior requires it to format the documentation
    constructor() {}

    /** Initializes all the GUI elements created in the HTML
     */
    static init() {

        // Add GUI Forms
        importNetworkModalForm();

        // Buttons 
        DOM.buttons.importNetwork = document.getElementById("importNetwork");
        DOM.buttons.importNetwork.onclick = getDataImport; // see importModalForm.js

        DOM.buttons.saveFile = document.getElementById("savePebblesForGH");
        DOM.buttons.saveFile.onclick = DOM.saveFile;

        // Fields 
        if (grassHopperOrPNG) {
            DOM.fields.nodeIndex = document.getElementById("nodeIndex");
            DOM.fields.nodeIndex.onchange = DOM.generatePNG;
        }
    }

    /**
     * Callback for loadJSON
     * @param {Object} data 
     */
    static onLoadNetwork(data, evt) {

        let nodesTemp
        if (data.nodes) {
            nodesTemp = data.nodes;
        } else if (data.clusters) {
            nodeTemp = data.clusters;
        }

        DataWrangler.makeTable(nodesTemp);
    }

    static saveFile() {
        if (pebbles.length > 0) {
            let json = { pebbles: [] };

            for (let i = 0; i < pebbles.length; i++) {
                const element = pebbles[i];
                json.pebbles.push(element.getJSON());
            }

            console.log(json);
            gp5.saveJSON(json, "pebbleDataForGH.json");
        } else {
            alert("No data loaded yet")
        }
    }

    static generatePNG(evt) {
        nodeIndex = evt.srcElement.value;
        count = 3;
        xPos = 0;
        yPos = 0;
        main.pGinit();
        gp5.loop();

    }
}
DOM.buttons = {};
DOM.fields = {};