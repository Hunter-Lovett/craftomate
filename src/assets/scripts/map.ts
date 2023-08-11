const gameMap = document.getElementById("map")!;

// "Home" the map
var mapPos = {x: 0, y: 0};
gameMap.style.top = `${mapPos.x}px`;
gameMap.style.left = `${mapPos.y}px`;

// Change map position on drag
gameMap.addEventListener("mousedown", (e) => {
    gameMap.style.cursor = "grabbing";
    var originalCoords = {x: e.clientX, y: e.clientY};
    document.onmousemove = (emove) => {
        // Change x position
        if (originalCoords.x > emove.clientX) {  // Drag to the left
            if (mapPos.x > (gameMap.offsetWidth / -2) + document.body.offsetWidth) mapPos.x -= (originalCoords.x - emove.clientX); // Ensure left border is not reached
            else mapPos.x = (gameMap.offsetWidth / -2) + document.body.offsetWidth; // Set to max if border is crossed
            gameMap.style.left = `${mapPos.x}px`;
        } else if (originalCoords.x < emove.clientX) { // Drag to the right
            if (mapPos.x < gameMap.offsetWidth / 2) mapPos.x += (emove.clientX - originalCoords.x); // Ensure right border is not reached
            else mapPos.x = gameMap.offsetWidth / 2; // Set to max if border is crossed
            gameMap.style.left = `${mapPos.x}px`;
        }
        // Change y position
        if (originalCoords.y > emove.clientY) {  // Drag down
            if (mapPos.y > (gameMap.offsetHeight / -2) + document.body.offsetHeight) mapPos.y -= (originalCoords.y - emove.clientY); // Ensure bottom border is not reached
            else mapPos.y = (gameMap.offsetHeight / -2) + document.body.offsetHeight; // Set to max if border is crossed
            gameMap.style.top = `${mapPos.y}px`;
        } else if (originalCoords.y < emove.clientY) { // Drag up
            if (mapPos.y < gameMap.offsetHeight / 2) mapPos.y += (emove.clientY - originalCoords.y); // Ensure top border is not reached
            else mapPos.y = gameMap.offsetHeight / 2; // Set to max if border is crossed
            gameMap.style.top = `${mapPos.y}px`;
        }
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
const cursor = document.getElementById("cursor")!;

function translateCoords(): Array<number> {
    return [
        (playerCoords.x.tile * tileSize) + (playerCoords.x.grid * (tileSize / 8)),
        (playerCoords.y.tile * tileSize) + (playerCoords.y.grid * (tileSize / 8))
    ]
}

gameMap.addEventListener("mousemove", (e) => {
    // Calculate position within the map element
    var rect = gameMap.getBoundingClientRect();
    var mouseX = e.clientX - rect.left;
    var mouseY = e.clientY - rect.top;
    // Calculate which tile the mouse is over
    var gridSize = tileSize / 8;
    var tileX = Math.floor(mouseX / tileSize);
    var tileY = Math.floor(mouseY / tileSize);
    // Update the coordinates
    playerCoords = {
        x: {
            tile: tileX,
            grid: Math.floor((mouseX - (tileX * tileSize)) / gridSize)
        }, y: {
            tile: tileY,
            grid: Math.floor((mouseY - (tileY * tileSize)) / gridSize)
        }
    }
    hudCoords.innerText = `X: ${playerCoords.x.tile}' ${playerCoords.x.grid}"  Y: ${playerCoords.y.tile}' ${playerCoords.y.grid}"`;
    // Cursor
    var cursorCoords = translateCoords();
    cursor.style.top = `${cursorCoords[1]}px`;
    cursor.style.left = `${cursorCoords[0]}px`;
})

// Create a new blank map
for (var y = 0; y < 15; y++) {
    for (var x = 0; x < 15; x++) {
        var tile = document.createElement("div");
        tile.setAttribute("id", `tile_${x}-${y}`);
        tile.dataset.tileX = `${x}`;
        tile.dataset.tileY = `${y}`;
        tile.classList.add("tile");
        tile.style.top = `${y * 20}vw`;
        tile.style.left = `${x * 20}vw`;
        // tile.style.transform = `rotate(${Math.round(Math.random() * 4) * 90}deg)`
        // tile.innerText = `x:${x} y:${y}`;
        gameMap.appendChild(tile);
    }
}