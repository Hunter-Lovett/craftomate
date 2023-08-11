"use strict";
const container = Array.from(document.getElementsByClassName("toolbar-container"));
const toolbarToggle = Array.from(document.getElementsByClassName("toolbar-toggle"));
const buildMenu = document.getElementById("build-menu");
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
toolbarToggle.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
        if (toggle.classList.contains("toggle-active")) {
            toggle.classList.remove("toggle-active");
            buildMenu.style.display = "none";
        }
        else {
            toggle.classList.add("toggle-active");
            buildMenu.style.display = "block";
        }
    });
});
//# sourceMappingURL=hud.js.map