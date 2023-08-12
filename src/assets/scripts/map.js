"use strict";
const gameMap = document.getElementById("map");
var mapPos = { x: 0, y: 0 };
gameMap.style.top = `${mapPos.x}px`;
gameMap.style.left = `${mapPos.y}px`;
gameMap.addEventListener("mousedown", (e) => {
    gameMap.style.cursor = "grabbing";
    var originalCoords = { x: e.clientX, y: e.clientY };
    document.onmousemove = (emove) => {
        if (originalCoords.x > emove.clientX) {
            if (mapPos.x > (gameMap.offsetWidth / -2) + document.body.offsetWidth)
                mapPos.x -= (originalCoords.x - emove.clientX);
            else
                mapPos.x = (gameMap.offsetWidth / -2) + document.body.offsetWidth;
            gameMap.style.left = `${mapPos.x}px`;
        }
        else if (originalCoords.x < emove.clientX) {
            if (mapPos.x < gameMap.offsetWidth / 2)
                mapPos.x += (emove.clientX - originalCoords.x);
            else
                mapPos.x = gameMap.offsetWidth / 2;
            gameMap.style.left = `${mapPos.x}px`;
        }
        if (originalCoords.y > emove.clientY) {
            if (mapPos.y > (gameMap.offsetHeight / -2) + document.body.offsetHeight)
                mapPos.y -= (originalCoords.y - emove.clientY);
            else
                mapPos.y = (gameMap.offsetHeight / -2) + document.body.offsetHeight;
            gameMap.style.top = `${mapPos.y}px`;
        }
        else if (originalCoords.y < emove.clientY) {
            if (mapPos.y < gameMap.offsetHeight / 2)
                mapPos.y += (emove.clientY - originalCoords.y);
            else
                mapPos.y = gameMap.offsetHeight / 2;
            gameMap.style.top = `${mapPos.y}px`;
        }
        originalCoords = { x: emove.clientX, y: emove.clientY };
    };
});
window.addEventListener("mouseup", (e) => {
    gameMap.style.cursor = "default";
    document.onmousemove = null;
});
var playerCoords;
const hudCoords = document.getElementById("hud_coordinates");
var tileSize = gameMap.offsetWidth / 15;
const cursor = document.getElementById("cursor");
function translateCoords(coords) {
    return [
        [
            (coords.x.tile * tileSize),
            (coords.x.grid * (tileSize / 8))
        ], [
            (coords.y.tile * tileSize),
            (coords.y.grid * (tileSize / 8))
        ]
    ];
}
gameMap.addEventListener("mousemove", (e) => {
    var rect = gameMap.getBoundingClientRect();
    var mouseX = e.clientX - rect.left;
    var mouseY = e.clientY - rect.top;
    var gridSize = tileSize / 8;
    var tileX = Math.floor(mouseX / tileSize);
    var tileY = Math.floor(mouseY / tileSize);
    playerCoords = {
        x: {
            tile: tileX,
            grid: Math.floor((mouseX - (tileX * tileSize)) / gridSize)
        }, y: {
            tile: tileY,
            grid: Math.floor((mouseY - (tileY * tileSize)) / gridSize)
        }
    };
    hudCoords.innerText = `X: ${playerCoords.x.tile}' ${playerCoords.x.grid}"  Y: ${playerCoords.y.tile}' ${playerCoords.y.grid}"`;
    var cursorCoords = translateCoords(playerCoords);
    cursor.style.top = `${cursorCoords[1][0] + cursorCoords[1][1]}px`;
    cursor.style.left = `${cursorCoords[0][0] + cursorCoords[0][1]}px`;
});
const mapData = new Map();
class Tile {
    constructor(x, y, env) {
        this.element = document.createElement("div");
        this.element.setAttribute("id", `tile_${x}-${y}`);
        this.element.classList.add("tile");
        this.element.style.top = `${y * 20}vw`;
        this.element.style.left = `${x * 20}vw`;
        if (env == "grass") {
            this.element.classList.add("grass");
        }
        else {
            this.element.classList.add("factory");
        }
        this.buildings = [];
        gameMap.appendChild(this.element);
        this.element = document.getElementById(`tile_${x}-${y}`);
        mapData.set(`tile_${x}-${y}`, this);
    }
    addBuilding(building) {
        this.buildings.push(building);
        var coords = translateCoords(building.position);
        building.element.style.top = coords[1][1] + "px";
        building.element.style.left = coords[0][1] + "px";
        this.element.appendChild(building.element);
    }
}
for (var y = 0; y < 15; y++) {
    for (var x = 0; x < 15; x++) {
        new Tile(x, y, "grass");
    }
}
//# sourceMappingURL=map.js.map