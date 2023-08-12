class TextureList {
    idle: String;
    active: String;
    constructor(type: String, category: String) {
        this.idle = `/graphics/${category}/${type}/idle.svg`;
        this.active = `/graphics/${category}/${type}/active.svg`;
    }
}

class Building {
    element: HTMLElement;
    position: Coordinate;
    textures: TextureList;
    powerStatus: String;
    constructor(type: String, category: String, speed: Number, position: Coordinate) {
        // Meta data+
        this.position = position;
        this.textures = new TextureList(type, category);
        this.powerStatus = "idle";
        // Create building
        this.element = document.createElement("div");
        this.element.classList.add("building");
        this.element.dataset.type = `${category}.${type}`;
        this.element.dataset.power = this.powerStatus as string;
        mapData.get(`tile_${this.position.x.tile}-${this.position.y.tile}`)!.addBuilding(this);
    }
}