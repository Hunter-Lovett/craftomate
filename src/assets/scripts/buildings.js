"use strict";
var gameData;
fetch("/data/gameObjects.json")
    .then((res) => { return res.json(); })
    .then((value) => { gameData = value; });
class Building {
    constructor(type, position) {
        this.position = position;
        this.powerStatus = "idle";
        this.type = type;
        this.element = document.createElement("div");
        this.element.classList.add("building");
        this.element.dataset.type = this.type;
        this.element.dataset.power = this.powerStatus;
        this.element.style.width = gameData.buildings[type.split(".")[0]][type.split(".")[1]].size[0] * gridSize + "px";
        this.element.style.height = gameData.buildings[type.split(".")[0]][type.split(".")[1]].size[1] * gridSize + "px";
        mapData.get(`tile_${this.position.x.tile}-${this.position.y.tile}`).addBuilding(this);
    }
}
//# sourceMappingURL=buildings.js.map