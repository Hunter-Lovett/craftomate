interface TextureCache {
    data: Map<String, String>,
    get: (key: string) => string,
}

fetch("/data/textureManifest.json")
    .then((res) => {return res.text()})
    .then((data) => {localStorage.setItem("textureCache", data)})

class Texture {
    data: string;
    type: Array<string>;
    constructor(object: string) {
        // Set data
        this.type = object.split("."); 

        // Get data
        this.data = JSON.parse(localStorage.getItem("textureCache")!)[object];
    }
}