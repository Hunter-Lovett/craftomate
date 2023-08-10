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
            mapPos.x -= (originalCoords.x - emove.clientX);
            gameMap.style.left = `${mapPos.x}px`;
        }
        else if (originalCoords.x < emove.clientX) {
            mapPos.x += (emove.clientX - originalCoords.x);
            gameMap.style.left = `${mapPos.x}px`;
        }
        if (originalCoords.y > emove.clientY) {
            mapPos.y -= (originalCoords.y - emove.clientY);
            gameMap.style.top = `${mapPos.y}px`;
        }
        else if (originalCoords.y < emove.clientY) {
            mapPos.y += (emove.clientY - originalCoords.y);
            gameMap.style.top = `${mapPos.y}px`;
        }
        originalCoords = { x: emove.clientX, y: emove.clientY };
    };
});
gameMap.addEventListener("mouseup", (e) => {
    gameMap.style.cursor = "default";
    document.onmousemove = null;
});
//# sourceMappingURL=map.js.map