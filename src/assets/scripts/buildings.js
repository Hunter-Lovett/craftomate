"use strict";
class Building {
    constructor(type, category, position) {
        this.position = position;
        this.powerStatus = "idle";
        this.element = document.createElement("div");
        this.element.classList.add("building");
        this.element.dataset.type = `${category}.${type}`;
        this.element.dataset.power = this.powerStatus;
        mapData.get(`tile_${this.position.x.tile}-${this.position.y.tile}`).addBuilding(this);
    }
}
//# sourceMappingURL=buildings.js.map