"use strict";
fetch("/data/textureManifest.json")
    .then((res) => { return res.text(); })
    .then((data) => { localStorage.setItem("textureCache", data); });
class Texture {
    constructor(object) {
        this.element = document.createElement("div");
        this.element.innerHTML = JSON.parse(localStorage.getItem("textureCache"))[object];
    }
}
//# sourceMappingURL=textureLoader.js.map