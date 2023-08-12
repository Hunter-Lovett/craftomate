"use strict";
class TextureList {
    constructor(type, category) {
        this.idle = `/graphics/${category}/${type}/idle.svg`;
        this.active = `/graphics/${category}/${type}/active.svg`;
    }
}
class Building {
    constructor(type, category, speed, position) {
        this.position = position;
        this.textures = new TextureList(type, category);
        this.powerStatus = "idle";
        this.element = document.createElement("div");
        this.element.classList.add("building");
        this.element.dataset.type = `${category}.${type}`;
        this.element.dataset.power = this.powerStatus;
        mapData.get(`tile_${this.position.x.tile}-${this.position.y.tile}`).addBuilding(this);
    }
}
//# sourceMappingURL=buildings.js.map