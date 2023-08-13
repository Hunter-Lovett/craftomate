class Building {
    element: HTMLElement;
    position: Coordinate;
    powerStatus: String;
    constructor(type: String, category: String, position: Coordinate) {
        // Meta data
        this.position = position;
        this.powerStatus = "idle";
        // Create building
        this.element = document.createElement("div");
        this.element.classList.add("building");
        this.element.dataset.type = `${category}.${type}`;
        this.element.dataset.power = this.powerStatus as string;
        mapData.get(`tile_${this.position.x.tile}-${this.position.y.tile}`)!.addBuilding(this);
    }
}
