fetch("/data/textureManifest.json")
    .then((res) => {return res.text()})
    .then((data) => {localStorage.setItem("textureCache", data)})

class Texture {
    element: HTMLElement;
    constructor(object: string) {
        // Get data
        this.element = document.createElement("div");
        this.element.innerHTML = JSON.parse(localStorage.getItem("textureCache")!)[object];
    }
}