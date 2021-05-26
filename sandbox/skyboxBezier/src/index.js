// tutorial from https://www.youtube.com/watch?v=cp-H_6VODko

let renderer, scene, camera, controls;

init();

function init() {
    // Renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("skyBox").appendChild(renderer.domElement);

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 50000);

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    camera.position.set(0, -200, 300);

    controls.autorotate = true;
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 1;
    // controls.minDistance = 10;
    // controls.maxDistance = 200;
    controls.update();

    let skyBox = new SkyBox(1344, 216, 288);
    skyBox.addToScene(scene);

    //  **** NETWORK *****

    // Axes
    var axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper)

    let nodes = [];
    for (let i = 0; i < 60; i++) {
        let tmp = new Node();
        let posX = (Math.random() * 1344) - (1044 / 2);
        let posY = (Math.random() * 30) - (130 / 2);
        tmp.obj.position.set(posX, posY, -144)
        nodes.push(tmp);
        tmp.addToScene(scene);
    }

    let edges = [];

    for (let i = 0; i < 100; i++) {
        let sourceIndex = Math.floor(Math.random() * nodes.length);
        let targetIndex = Math.floor(Math.random() * nodes.length);
        if (sourceIndex == targetIndex) {
            targetIndex = Math.floor(Math.random() * nodes.length);
        }
        let edgeST = new Edge(nodes[sourceIndex], nodes[targetIndex], Math.floor(Math.random() * 4));
        edges.push(edgeST);
        edgeST.addToScene(scene);
    }

    animate();
}

function animate() {
    requestAnimationFrame(animate)
    controls.update();
    renderer.render(scene, camera);
}