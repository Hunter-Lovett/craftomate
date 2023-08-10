const gameMap = document.getElementById("map")!;
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
            // mapPos.x = mapPos.x - (((originalCoords.x - e.clientX) / window.screen.availWidth) / gameMap.offsetWidth)
            mapPos.x -= (originalCoords.x - emove.clientX);
            gameMap.style.left = `${mapPos.x}px`
        } else if (originalCoords.x < emove.clientX) { // Drag to the right
            mapPos.x += (emove.clientX - originalCoords.x);
            gameMap.style.left = `${mapPos.x}px`
        }
        // Change y position
        if (originalCoords.y > emove.clientY) {  // Drag to the left
            // mapPos.x = mapPos.x - (((originalCoords.x - e.clientX) / window.screen.availWidth) / gameMap.offsetWidth)
            mapPos.y -= (originalCoords.y - emove.clientY);
            gameMap.style.top = `${mapPos.y}px`
        } else if (originalCoords.y < emove.clientY) { // Drag to the right
            mapPos.y += (emove.clientY - originalCoords.y);
            gameMap.style.top = `${mapPos.y}px`
        }
        // Update coordinates
        originalCoords = {x: emove.clientX, y: emove.clientY};
    }
})

gameMap.addEventListener("mouseup", (e) => {
    gameMap.style.cursor = "default";
    document.onmousemove = null;
})