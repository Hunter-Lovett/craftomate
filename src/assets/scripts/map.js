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
for (var y = 0; y < 15; y++) {
    for (var x = 0; x < 15; x++) {
        var tile = document.createElement("div");
        tile.setAttribute("id", `tile_${x}-${y}`);
        tile.classList.add("tile");
        tile.style.top = `${y * 20}vw`;
        tile.style.left = `${x * 20}vw`;
        gameMap.appendChild(tile);
    }
}
//# sourceMappingURL=map.js.map