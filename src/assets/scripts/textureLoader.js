"use strict";
fetch("/data/textureManifest.json")
    .then((res) => { return res.text(); })
    .then((data) => { localStorage.setItem("textureCache", data); });
class Texture {
    constructor(object) {
        this.type = object.split(".");
        this.data = JSON.parse(localStorage.getItem("textureCache"))[object];
    }
}
//# sourceMappingURL=textureLoader.js.map