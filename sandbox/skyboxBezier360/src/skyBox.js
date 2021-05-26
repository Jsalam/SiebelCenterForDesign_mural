//https://threejsfundamentals.org/threejs/lessons/threejs-backgrounds.html

class SkyBox {

    constructor(_width, _height, _depth, _scene, _renderer) {
        // Textures
        let prefix = './textures/'
        let loader = new THREE.TextureLoader();
        let texture = loader.load(prefix + 'SCD360.JPG', () => {
            const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
            rt.fromEquirectangularTexture(_renderer, texture);
            _scene.background = rt;
        })
    }
}