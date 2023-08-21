var keybinds = {
    map: {
        up: "ArrowUp",
        down: "ArrowDown",
        left: "ArrowLeft",
        right: "ArrowRight",
    },
    toolbar: {
        toggleTransport: "F1",
        toggleExtraction: "F2",
    },
    cursor: {
        fire: "Enter",
        up: "W",
        down: "S",
        left: "A",
        right: "D",
        exit: "Escape"
    }
}

var mapStep = tileSize / 7;

window.addEventListener("keydown", (e) => {
    var key = e.key.length == 1 ? e.key.toUpperCase() : e.key;
    // console.log(key, e.key);
    switch(key) {
        // Map
        case keybinds.map.right:
            moveMap.right(mapStep);
            break;
        case keybinds.map.left:
            moveMap.left(mapStep);
            break;
        case keybinds.map.down:
            moveMap.down(mapStep);
            break;
        case keybinds.map.up:
            moveMap.up(mapStep);
            break;
        // Toolbar
        case keybinds.toolbar.toggleTransport:
            toggleBuildList(toolbarToggle[0]);
            break;
        case keybinds.toolbar.toggleExtraction:
            toggleBuildList(toolbarToggle[1]);
            break;
        // Cursor
        case keybinds.cursor.fire:
            cursorMode();
            break;
        case keybinds.cursor.up:
            var currentCoords = playerCoords;
            currentCoords.y.grid -= 1;
            if (currentCoords.y.grid < 0) {
                currentCoords.y.grid = 7;
                currentCoords.y.tile -= 1;
            }
            updatePlayerCoords(currentCoords);
            break;
        case keybinds.cursor.down:
            var currentCoords = playerCoords;
            currentCoords.y.grid += 1;
            if (currentCoords.y.grid > 7) {
                currentCoords.y.grid = 0;
                currentCoords.y.tile += 1;
            }
            updatePlayerCoords(currentCoords);
            break;
        case keybinds.cursor.right:
            var currentCoords = playerCoords;
            currentCoords.x.grid += 1;
            if (currentCoords.x.grid > 7) {
                currentCoords.x.grid = 0;
                currentCoords.x.tile += 1;
            }
            updatePlayerCoords(currentCoords);
            break;
        case keybinds.cursor.left:
            var currentCoords = playerCoords;
            currentCoords.x.grid -= 1;
            if (currentCoords.x.grid < 0) {
                currentCoords.x.grid = 7;
                currentCoords.x.tile -= 1;
            }
            updatePlayerCoords(currentCoords);
            break;
        case keybinds.cursor.exit:
            cursorStatus = "idle";
            cursorIcon.innerHTML = "";
            cursorIcon.style.width = "100%";
            cursorIcon.style.height = "100%";
            cursorIcon.style.transform = "translate(0%, 0%)";
            cursorMode = () => {
                console.log("click")
            }
    }
})