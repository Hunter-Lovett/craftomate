"use strict";
const container = Array.from(document.getElementsByClassName("toolbar-container"));
const toolbarToggle = Array.from(document.getElementsByClassName("toolbar-item"));
const buildItems = Array.from(document.getElementsByClassName("build-menu-item"));
const buildMenu = document.getElementById("build-menu");
const buildList = new Map([
    ["transport", document.getElementById("transport")],
    ["extraction", document.getElementById("extraction")],
]);
var scrollFactor = 0;
container.forEach((cont) => {
    cont.addEventListener("wheel", (e) => {
        if (!(scrollFactor - (e.deltaY || e.deltaX) >= 0) &&
            !(scrollFactor - (e.deltaY || e.deltaX) <= (cont.scrollWidth - cont.offsetWidth) * -1)) {
            console.log(e.deltaY, e.deltaX);
            scrollFactor -= e.deltaY || e.deltaX;
        }
        else if (scrollFactor - (e.deltaY || e.deltaX) >= 0)
            scrollFactor = 0;
        else
            scrollFactor = (cont.scrollWidth - cont.offsetWidth) * -1;
        cont.style.setProperty("--toolbar-item-scroll", `${scrollFactor}px`);
    });
});
function toggleBuildList(toggle) {
    if (toggle.classList.contains("toggle-active")) {
        toggle.classList.remove("toggle-active");
        buildMenu.style.display = "none";
    }
    else {
        toolbarToggle.forEach((elem) => {
            elem.classList.remove("toggle-active");
        });
        buildList.forEach((elem) => {
            elem.style.display = "none";
        });
        menuInfo.innerText = toggle.dataset.menu[0].toUpperCase() + toggle.dataset.menu.slice(1);
        menuInfo.style.setProperty("--info-icon", `url(/graphics/icons/${toggle.dataset.menu}.svg)`);
        buildList.get(toggle.dataset.menu).style.display = "flex";
        toggle.classList.add("toggle-active");
        buildMenu.style.display = "block";
    }
}
const menuInfo = document.getElementById("build-menu-info");
toolbarToggle.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
        toggleBuildList(toggle);
    });
});
const cursorIcon = document.getElementById("cursor-icon");
function cursorIdleMode() {
    console.log("Cursor clicked, idling");
}
var cursorMode = cursorIdleMode;
cursor.addEventListener("click", (e) => {
    cursorMode();
});
buildItems.forEach((item) => {
    item.addEventListener("click", (e) => {
        var buildItem = item.dataset.type.split(".");
        cursorIcon.setAttribute("src", `/graphics/${buildItem[0]}/${buildItem[1]}/active.svg`);
        cursorMode = () => {
            new Building(buildItem[1], buildItem[0], playerCoords);
        };
    });
});
//# sourceMappingURL=hud.js.map