let renderer, scene, camera, light, controls;

init();

// ***** FUNCTIONS ******


function init() {
    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("bezier").appendChild(renderer.domElement);

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    //camera.position.set(50, 50, 145);
    camera.position.set(0, 0, 50);
    scene.add(camera);

    // Light
    light = new THREE.AmbientLight(0xff4040);
    light.position.set(20, 20, 25);
    scene.add(light);

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Axes
    var axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper)

    // Node A
    let nodeA = new Node();
    nodeA.obj.position.set(-20, 0, 0);
    nodeA.addToScene(scene);

    // Node B
    let nodeB = new Node();
    nodeB.obj.position.set(20, 0, 0);
    nodeB.addToScene(scene);

    // Node C
    let nodeC = new Node();
    nodeC.obj.position.set(60, 0, 0);
    nodeC.addToScene(scene);

    // Edge AB
    let edgeAB = new Edge(nodeA, nodeB);
    edgeAB.addToScene(scene)

    // Edge AC
    let edgeAC = new Edge(nodeA, nodeC);
    edgeAC.addToScene(scene)

    animate();
}

function animate() {
    requestAnimationFrame(animate)
    controls.update();
    renderer.render(scene, camera);
}