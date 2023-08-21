fetch("/data/textureManifest.json")
    .then((res) => {return res.text()})
    .then((data) => {localStorage.setItem("textureCache", data)})

class Texture {
    element: HTMLElement;
    uri: string;
    data: string;
    constructor(object: string) {
        console.log(object);
        // Get data
        this.data = JSON.parse(localStorage.getItem("textureCache")!)[object];
        this.uri = "data:image/svg+xml;base64," + btoa(this.data);
        // Create element
        this.element = document.createElement("img");
        this.element.setAttribute("src", this.uri);
        this.element.setAttribute("draggable", "false");
    }
}