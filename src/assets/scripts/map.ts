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

// Create a new blank map
for (var y = 0; y < 15; y++) {
    for (var x = 0; x < 15; x++) {
        var tile = document.createElement("div");
        tile.setAttribute("id", `tile_${x}-${y}`);
        tile.classList.add("tile");
        tile.style.top = `${y * 20}vw`;
        tile.style.left = `${x * 20}vw`;
        // tile.innerText = `x:${x} y:${y}`;
        gameMap.appendChild(tile);
    }
}