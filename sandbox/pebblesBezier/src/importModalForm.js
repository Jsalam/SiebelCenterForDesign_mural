let nodesImported;
let edgesImported;

importNetworkModalForm = function() {

    var networkFile = document.getElementById('dragDropNetwork');

    makeDroppable(networkFile, callbackNetwork);
}

getDataImport = function(evt) {
    DOM.onLoadNetwork({ nodes: nodesImported, edges: edgesImported }, evt)
}

callbackNetwork = function(files) {
    //Only process json files.
    if (files[0].type.endsWith('json')) {
        document.getElementById('networkFileName').innerHTML = files[0].name
        loadFile(files[0]);
    } else {
        alert("Wrong file format. Must use a JSON file")
    }
}

loadFile = function(file) {

    // clean all global containers
    nodesImported = undefined;
    edgesImported = undefined;
    data = undefined;;
    pebbles = [];
    DataWrangler.table = undefined;

    let reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function(theFile) {
        return function(e) {
            // Read text data and parse to JSON.
            let data = JSON.parse(e.target.result)

            if (data.nodes) {
                nodesImported = data.nodes;
            } else if (data.clusters) {
                nodesImported = data.clusters;
            }
            edgesImported = data.edges;
        };
    })(file);
    // Read in the file as text.
    reader.readAsText(file);
}

callback = function(files) {
    console.log("both")
    console.log(files.getData());
}

//source: https://bitwiser.in/2015/08/08/creating-dropzone-for-drag-drop-file.html
makeDroppable = function(element, callback) {

    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('multiple', true);
    input.style.display = 'none';

    input.addEventListener('change', triggerCallback);
    element.appendChild(input);

    element.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        element.classList.add('dragover');
    });

    element.addEventListener('dragleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        element.classList.remove('dragover');
    });

    element.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        element.classList.remove('dragover');
        triggerCallback(e);
    });

    element.addEventListener('click', function() {
        input.value = null;
        input.click();
    });

    function triggerCallback(e) {
        var files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        callback.call(null, files);
    }
}