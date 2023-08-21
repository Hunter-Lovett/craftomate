const gameMap = document.getElementById("map")!;

// "Home" the map
var mapPos = {x: 0, y: 0};
gameMap.style.top = `${mapPos.x}px`;
gameMap.style.left = `${mapPos.y}px`;

const moveMap = {
    // Drag to the left (map moves right to left)
    right: function(step: number): void {
        if (mapPos.x > (gameMap.offsetWidth / -2) + document.body.offsetWidth) mapPos.x -= step; // Ensure left border is not reached
        else mapPos.x = (gameMap.offsetWidth / -2) + document.body.offsetWidth; // Set to max if border is crossed
        gameMap.style.left = `${mapPos.x}px`;
    },
    // Drag to the right (map moves left to right)
    left: function(step: number): void {
            if (mapPos.x < gameMap.offsetWidth / 2) mapPos.x += step; // Ensure right border is not reached
            else mapPos.x = gameMap.offsetWidth / 2; // Set to max if border is crossed
            gameMap.style.left = `${mapPos.x}px`;
    },
    // Drag down (map moves top to bottom)
    down: function(step: number): void {
        if (mapPos.y > (gameMap.offsetHeight / -2) + document.body.offsetHeight) mapPos.y -= step; // Ensure bottom border is not reached
        else mapPos.y = (gameMap.offsetHeight / -2) + document.body.offsetHeight; // Set to max if border is crossed
        gameMap.style.top = `${mapPos.y}px`;
    },
    // Drag up (map moves bottom to top)
    up: function(step: number): void {
        if (mapPos.y < gameMap.offsetHeight / 2) mapPos.y += step; // Ensure top border is not reached
        else mapPos.y = gameMap.offsetHeight / 2; // Set to max if border is crossed
        gameMap.style.top = `${mapPos.y}px`;
    }

}

// Change map position on drag
gameMap.addEventListener("mousedown", (e) => {
    gameMap.style.cursor = "grabbing";
    var originalCoords = {x: e.clientX, y: e.clientY};
    document.onmousemove = (emove) => {
        // Change x position
        if (originalCoords.x > emove.clientX) moveMap.right(originalCoords.x - emove.clientX);
        else if (originalCoords.x < emove.clientX) moveMap.left(emove.clientX - originalCoords.x);
        // Change y position
        if (originalCoords.y > emove.clientY) moveMap.down(originalCoords.y - emove.clientY);
        else if (originalCoords.y < emove.clientY) moveMap.up(emove.clientY - originalCoords.y);
        // Update coordinates
        originalCoords = {x: emove.clientX, y: emove.clientY};
    }
})

window.addEventListener("mouseup", (e) => {
    gameMap.style.cursor = "default";
    document.onmousemove = null;
})

// Coordinates
interface Coordinate {
    x: {
        tile: number,
        grid: number
    },
    y: {
        tile: number,
        grid: number
    }
}

var playerCoords: Coordinate;
const hudCoords = document.getElementById("hud_coordinates")!;
var tileSize = gameMap.offsetWidth / 15;
var gridSize = tileSize / 8;
const cursor = document.getElementById("cursor")!;

function updatePlayerCoords(coords: Coordinate) {
    playerCoords = coords;
    // Update HUD
    hudCoords.innerText = `X: ${playerCoords.x.tile}' ${playerCoords.x.grid}"  Y: ${playerCoords.y.tile}' ${playerCoords.y.grid}"`;
    // Cursor
    var cursorCoords = translateCoords(playerCoords);
    cursor.style.top = `${cursorCoords[1][0] + cursorCoords[1][1]}px`;
    cursor.style.left = `${cursorCoords[0][0] + cursorCoords[0][1]}px`;
}

function translateCoords(coords: Coordinate): Array<Array<number>> {
    return [
        [ // X
            (coords.x.tile * tileSize), // Tile
            (coords.x.grid * (tileSize / 8)) // Grid
        ], [ // Y
            (coords.y.tile * tileSize), // Tile
            (coords.y.grid * (tileSize / 8)) // Grid
        ]
    ]
}

gameMap.addEventListener("mousemove", (e) => {
    // Calculate position within the map element
    var rect = gameMap.getBoundingClientRect();
    var mouseX = e.clientX - rect.left;
    var mouseY = e.clientY - rect.top;
    // Calculate which tile the mouse is over
    var tileX = Math.floor(mouseX / tileSize);
    var tileY = Math.floor(mouseY / tileSize);
    // Update the coordinates
    updatePlayerCoords({
        x: {
            tile: tileX,
            grid: Math.floor((mouseX - (tileX * tileSize)) / gridSize)
        }, y: {
            tile: tileY,
            grid: Math.floor((mouseY - (tileY * tileSize)) / gridSize)
        }
    })
})

// Create a new blank map
const mapData: Map<String, Tile> = new Map();
class Tile {
    element: HTMLElement;
    buildings: Map<String, Building>;
    grid: Array<Array<String>>;
    constructor(x: number, y: number, env: String) {
        // Empty grid
        this.grid = Array(8).fill("");
        this.grid.map(() => {Array(8).fill("")});
        // Create element
        this.element = document.createElement("div");
        this.element.setAttribute("id", `tile_${x}-${y}`);
        this.element.classList.add("tile");
        this.element.style.top = `${y * 20}vw`;
        this.element.style.left = `${x * 20}vw`;
        // Load correct textures
        if(env == "grass") {
            this.element.classList.add("grass");
            // this.element.style.transform = `rotate(${Math.round(Math.random() * 4) * 90}deg)`;
        } else {
            this.element.classList.add("factory");
        }
        // Add to game
        this.buildings = new Map();
        gameMap.appendChild(this.element);
        this.element = document.getElementById(`tile_${x}-${y}`)!;
        mapData.set(`tile_${x}-${y}`, this);
    }

    addBuilding(building: Building) {
        var uid = `${playerCoords.x.tile}${playerCoords.x.grid}${playerCoords.y.grid}${playerCoords.y.tile}`;
        // Check for existing building
        if (this.buildings.get(uid)) return;
        // Create building
        this.buildings.set(uid, building);
        // Add building to map
        var coords = translateCoords(building.position);
        building.element.style.top = coords[1][1] + "px";
        building.element.style.left = coords[0][1] + "px";
        this.element.appendChild(building.element);
    }
}


for (var y = 0; y < 15; y++) {
    for (var x = 0; x < 15; x++) {
        new Tile(x, y, "factory");
    }
}