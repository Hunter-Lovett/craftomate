"use strict";
fetch("/data/textureManifest.json")
    .then((res) => { return res.text(); })
    .then((data) => { localStorage.setItem("textureCache", data); });
class Texture {
    constructor(object) {
        console.log(object);
        this.data = JSON.parse(localStorage.getItem("textureCache"))[object];
        this.uri = "data:image/svg+xml;base64," + btoa(this.data);
        this.element = document.createElement("img");
        this.element.setAttribute("src", this.uri);
        this.element.setAttribute("draggable", "false");
    }
}
//# sourceMappingURL=textureLoader.js.map