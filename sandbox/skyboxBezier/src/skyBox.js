class SkyBox {

    constructor(_width, _height, _depth) {
        // Textures
        let prefix = './textures/finishedBuilding/layers/'
        let texture_north = new THREE.TextureLoader().load(prefix + '_north@0.75x.png');
        let texture_sky = new THREE.TextureLoader().load(prefix + '_ceiling@0.75x.png');
        let texture_west = new THREE.TextureLoader().load(prefix + '_west@0.75x.png');
        let texture_south = new THREE.TextureLoader().load(prefix + '_south@0.75x.png');
        let texture_ground = new THREE.TextureLoader().load(prefix + '_ceiling@0.75x.png');
        let texture_east = new THREE.TextureLoader().load(prefix + '_east@0.75x.png');

        let materials = [];
        // X+ EAST
        materials.push(new THREE.MeshBasicMaterial({
            map: texture_east
        }));
        // X- WEST
        materials.push(new THREE.MeshBasicMaterial({
            map: texture_west
        }));
        // Y+ SKY
        materials.push(new THREE.MeshBasicMaterial({
            map: texture_sky
        }));
        // Y- GROUND
        materials.push(new THREE.MeshBasicMaterial({
            color: "#000000"
        }));
        // Z- SOUTH
        materials.push(new THREE.MeshBasicMaterial({
            map: texture_south
        }));
        // Z+ NORTH
        materials.push(new THREE.MeshBasicMaterial({
            map: texture_north
        }));


        materials.forEach(element => {
            element.side = THREE.BackSide;
        });

        // Geometry 
        let skyBoxGeo = new THREE.BoxGeometry(_width, _height, _depth); // volumen in inches
        this.skyBox = new THREE.Mesh(skyBoxGeo, materials);

    }

    addToScene(scene) {
        scene.add(this.skyBox);
    }

}