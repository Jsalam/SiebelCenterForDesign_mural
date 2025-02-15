/** ECMA5 has a crazy way of handling reference to objects instantiated via a constructor. 
 * I discovered that when you call THIS within the scope of the class code, it not always 
 * refers to the instance itself but to relative scopes within the functions inside the class
 * definition. Let's look at this case: in this class, the function setup() enables a watchPosition()
 * function with three callbacks. The callback functions belong to the class, so I need to 
 * refer them using THIS. But the success function is expecting only one value: an object with the
 * coordinates result of the GPS reading. If I want to assign that object to the instance's variable this.pos
 * it turns out that 'this' is undefined within the domain of the success function. So I need to pass the 
 * actual instance as a parameter of the callback using BIND.
 * 
 * The craziest part is that the instance is not
 * passed as a reference to itself but as a 'independent variable'. That is why within the scope of
 * setup there is a variable 'obj'. That is a placeholder for the instance. How is the placeholder linked
 * to the instance? I DO NOT KNOW. More info here: https://www.jstips.co/en/javascript/passing-arguments-to-callback-functions/
 * // from https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
 * */

class DevicePos {

    constructor() {
        this.status = "GPS not enabled";
        this.pos = { "lat": undefined, "lon": undefined }
        this.heading;
        this.speed;
        this.altitude;
        this.accuracy;
        this.watchID = undefined;
        this.geo_options = {
            enableHighAccuracy: true,
            //milliseconds of a possible cached position that is acceptable to return
            maximumAge: 300,
            //the maximum length of time (in milliseconds) the device is allowed to take in order to return a position
            timeout: 5000
        };
    }

    /** This MUST be invoked to activate the instance  */
    setup() {
        // a variable holding THIS object
        let obj;
        // getting the position
        if (!navigator.geolocation) {
            this.status = 'Geolocation is not supported by your browser';
        } else {
            this.status = 'Locating…';
            //callback is called multiple times, allowing the browser to either update your location as you move, or provide a more accurate location as different techniques are used to geolocate you.
            this.watchID = navigator.geolocation.watchPosition(this.success.bind(obj, this), this.error.bind(obj), this.geo_options);
        }
    }

    /** Callback */
    success(obj, position) {
        obj.pos.lat = position.coords.latitude;
        obj.pos.lon = position.coords.longitude;
        obj.status = 'GPS OK';
        obj.altitude = position.coords.altitude;
        obj.heading = position.coords.heading;
        obj.speed = position.coords.speed;
        obj.accuracy = position.coords.accuracy;
    }

    /**Callback*/
    error(obj) {
            obj.status = 'Unable to retrieve your location';
        }
        /** Retruns the status and position
         * @return Object with status and pos objects
         */
    getPos() {
        return { "status": this.status, "pos": this.pos }
    }

    getLatLon() {
        return [this.pos.lat, this.pos.lon];
    }

    getLonLat() {
        return [this.pos.lon, this.pos.lat];
    }

    getAltitude() {
        return this.altitude;
    }

    getHeading() {
        if (this.heading != null) {
            return this.heading.toFixed(2);
        } else {
            return this.heading;
        }
    }

    getSpeed() {
        if (this.speed != null) {
            return this.speed.toFixed(2);
        } else {
            return this.speed;
        }
    }

    getSpeedKMH() {
        return this.getSpeed() * 0.36
    }

    getAccuracy() {
        return this.accuracy;
    }

    stopTracking() {
        navigator.geolocation.clearWatch(watchID);
    }

    /**
     * Estimates the distance between to lon-lat coordinates in meters 
     * @param {Object} target Object with lat and lon properties.
     */
    getDistanceTo(target) {
        return Utils.getDistance(this.pos, target)
    }
}