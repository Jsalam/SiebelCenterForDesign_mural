/**
 * 
 */
class Edge {
    constructor(_source, _target, _material) {
        this.source = _source;
        this.target = _target;
        this.controlPoints = this._getControlPoints(5, 1, 20);
        this.curve = new THREE.CubicBezierCurve3(
            //source
            this.source.obj.position,
            // control point 1
            this.controlPoints.fromSource,
            //new THREE.Vector3().addVectors(this.source.obj.position, new THREE.Vector3(10, 30, 15)),
            // control point 2
            this.controlPoints.fromTarget,
            //new THREE.Vector3().addVectors(this.target.obj.position, new THREE.Vector3(-10, 30, 15)),
            // target
            this.target.obj.position
        );
        this.points = this.curve.getPoints(25);
        // Geometry
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        // Material
        this.material = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 4 });
        if (_material) {
            this.material = _material;
        }
        // Object
        this.obj = new THREE.Line(this.geometry, this.material);
    }

    _getControlPoints(fractionX, fractionY, fractionZ) {
        let tmp = this._getControlPointsXOffset(fractionX);
        this._getControlPointsYOffset(fractionY, tmp)
        return (this._getControlPointsZOffset(fractionZ, tmp));
    }

    /**
     * @param {Number} fraction The divisor of the distance between nodes. The lower the number the steeper the curve gradient
     */
    _getControlPointsXOffset(fraction) {
        let segment = this.source.obj.position.distanceTo(this.target.obj.position) / fraction
        let fromSource = this.source.obj.position.clone();
        let fromTarget = this.target.obj.position.clone();
        fromSource.add(new THREE.Vector3(segment, 0, 0));
        fromTarget.add(new THREE.Vector3(-segment, 0, 0));
        return { 'fromSource': fromSource, 'fromTarget': fromTarget }
    }

    /**
     * @param {Number} fraction The divisor of the distance between nodes. The lower the number the steeper the curve gradient
     */
    _getControlPointsYOffset(fraction, xOffestPoints) {
        let segment = this.source.obj.position.distanceTo(this.target.obj.position) / fraction
        xOffestPoints.fromSource.add(new THREE.Vector3(0, segment, 0));
        xOffestPoints.fromTarget.add(new THREE.Vector3(0, segment, 0));
        return (xOffestPoints)
    }

    /**
     * @param {Number} fraction The divisor of the distance between nodes. The lower the number the taller the curve
     */
    _getControlPointsZOffset(fraction, yOffestPoints) {
        let segment = this.source.obj.position.distanceTo(this.target.obj.position) / fraction
        yOffestPoints.fromSource.add(new THREE.Vector3(0, 0, segment));
        yOffestPoints.fromTarget.add(new THREE.Vector3(0, 0, segment));
        return (yOffestPoints)
    }

    addToScene(scene) {
        scene.add(this.obj)
    }
}