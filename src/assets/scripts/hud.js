"use strict";
const bar = document.getElementById("toolbar");
const container = document.getElementById("toolbar-container");
var scrollFactor = 0;
bar.addEventListener("wheel", (e) => {
    if (!(scrollFactor - (e.deltaY || e.deltaX) >= 0) &&
        !(scrollFactor - (e.deltaY || e.deltaX) <= (container.scrollWidth - container.offsetWidth) * -1)) {
        console.log(e.deltaY, e.deltaX);
        scrollFactor -= e.deltaY || e.deltaX;
    }
    else if (scrollFactor - (e.deltaY || e.deltaX) >= 0)
        scrollFactor = 0;
    else
        scrollFactor = (container.scrollWidth - container.offsetWidth) * -1;
    container.style.setProperty("--toolbar-item-scroll", `${scrollFactor}px`);
});
//# sourceMappingURL=hud.js.map