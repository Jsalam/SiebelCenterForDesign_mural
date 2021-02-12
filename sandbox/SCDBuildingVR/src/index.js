import * as THREE from '../build/three.module.js';
import { OrbitControls } from '../examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../examples/jsm/loaders/GLTFLoader.js';

var renderer, scene, camera, controls;
init();

/** Initialize app */
function init() {
    initScene();
    initCamera();
    initRenderer();
    initControls();
    loadModels();
    initLighting();
    animate();
}

function animate() {
    requestAnimationFrame(animate)
    controls.update();
    renderer.render(scene, camera);
}

/**Scene*/
function initScene() {
    scene = new THREE.Scene();
    scene.castShadow = true;
    scene.receiveShadow = true;
}

/**Camera */
function initCamera() {
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 500000);
    camera.position.set(-720, 60, 0);

    // helper
    var helper = new THREE.CameraHelper(camera);
    scene.add(helper);
}

/** Renderer */
function initRenderer() {
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("scd").appendChild(renderer.domElement);
}

/** Controls*/
function initControls() {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.autorotate = true;
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 1;
    //controls.minDistance = 10;
    controls.maxDistance = 400;
    controls.target = new THREE.Vector3(-720, 60, -100);
}

/** Load Models and textures */
function loadModels() {
    //MODEL
    let loader = new GLTFLoader();

    //loadBuilding();
    loadMainGalleryWall();
    loadSecondaryGalleryWall();

    function loadBuilding() {
        let id;
        loader.load('./models/scd.glb', function(scd) {
            id = scd.scene.uuid;
            // add model to scene
            scene.add(scd.scene);

            //scaleModel(gltf, 12)
            switchToWhite(scd);

            scd.scene.traverse(function(child) {
                // if (child instanceof THREE.Group) {
                // child.material = new THREE.MeshPhysicalMaterial();
                child.castShadow = true;
                child.receiveShadow = true;
                //}
            });

        }, undefined, function(error) {
            console.error(error);
        });
    }

    function loadMainGalleryWall() {

        // load texture
        let texture = loadTexture("./textures/Helvetica_URWForm.png");

        // load the model
        let id;
        loader.load('./models/mainGalleryWall.glb', function(mainGalleryWall) {
            id = mainGalleryWall.scene.uuid;
            scene.add(mainGalleryWall.scene);

            switchToGray(mainGalleryWall);

            // apply material to model
            assignTextures(id, texture);

        }, undefined, function(error) {
            console.error(error);
        });

    }

    function loadSecondaryGalleryWall() {
        let id;
        loader.load('./models/minorGalleryWall.glb', function(mainGalleryWall) {
            id = mainGalleryWall.scene.uuid;
            scene.add(mainGalleryWall.scene);

            switchToGray(mainGalleryWall);

        }, undefined, function(error) {
            console.error(error);
        });
        return { "secondaryWall": id }
    }

    function switchToWhite(model) {
        let objects = model.scene.children[0].children
        for (const object of objects) {
            object.material.color = new THREE.Color(0xfcfcf4);

        }
    }

    function switchToGray(model) {
        let objects = model.scene.children[0].children
        for (const object of objects) {
            object.material.color = new THREE.Color(0x566573);
        }
    }
}

/** Lighting */
function initLighting() {
    // LIGHTING
    var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(200, 13%, 75%)'), 0.3);
    keyLight.position.set(-700, 60, 0);
    keyLight.castShadow = true;

    var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(53, 13%, 75%)'), 0.75);
    fillLight.position.set(100, 0, 100);
    fillLight.castShadow = true;

    var backLight = new THREE.DirectionalLight(0xffffff, 0.25);
    backLight.position.set(100, 0, -100).normalize();
    backLight.castShadow = true;

    var ambientLight = new THREE.AmbientLight(0xE6E7DD, 0.35); // soft white light

    let lightColor = 0xD0E0E3;

    var spotLight1 = createSpotlight(lightColor);
    var spotLight2 = createSpotlight(lightColor);
    var spotLight3 = createSpotlight(lightColor);
    var spotLight4 = createSpotlight(lightColor);
    var spotLight5 = createSpotlight(lightColor);
    var spotLight6 = createSpotlight(lightColor);
    var spotLight7 = createSpotlight(lightColor);

    spotLight1.position.set(-1140, 250, -200);
    spotLight1.target.position.set(-1140, 0, -200);


    spotLight2.position.set(-990, 250, -200);
    spotLight2.target.position.set(-990, 0, -200);

    spotLight3.position.set(-840, 250, -200);
    spotLight3.target.position.set(-840, 0, -200);

    spotLight4.position.set(-690, 250, -200);
    spotLight4.target.position.set(-690, 0, -200);

    spotLight5.position.set(-540, 250, -200);
    spotLight5.target.position.set(-540, 0, -200);

    spotLight6.position.set(-280, 250, -200);
    spotLight6.target.position.set(-280, 0, -200);

    spotLight7.position.set(-150, 250, -200);
    spotLight7.target.position.set(-150, 0, -200);


    scene.add(spotLight1, spotLight2, spotLight3, spotLight4, spotLight5, spotLight6, spotLight7);
    scene.add(spotLight1.target, spotLight2.target, spotLight3.target, spotLight4.target, spotLight5.target, spotLight6.target, spotLight7.target);
    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);
    scene.add(ambientLight);

    function createSpotlight(color) {

        var spotLight = new THREE.SpotLight(color, 2);

        spotLight.castShadow = true;
        spotLight.angle = Math.PI / 10;
        spotLight.penumbra = 0.2;
        spotLight.intensity = 6;
        spotLight.distance = 500;
        spotLight.decay = 6;

        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;

        spotLight.shadow.camera.near = 500;
        spotLight.shadow.camera.far = 4000;
        spotLight.shadow.camera.fov = 30;

        return spotLight;

    }
}

/** Textures */
function loadTexture(fileName) {
    let texture = new THREE.TextureLoader().load(fileName, function() {}, function() {}, function(error) {
        alert("Missing file or wrong name");
    });
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 6.08);
    texture.transformUv(new THREE.Vector2(-1, -11));
    texture.flipY = false;
    return texture;
}

function assignTextures(id, texture) {
    var material = new THREE.MeshStandardMaterial({ map: texture });
    let wall = scene.children.filter(elmnt => elmnt.uuid == id)[0];
    wall.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            child.material = material
        }
        child.castShadow = true;
        child.receiveShadow = true;
    });
}