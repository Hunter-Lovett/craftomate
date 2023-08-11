const bar = document.getElementById("toolbar")!;
const container = document.getElementById("toolbar-container")!;

// Scroll through toolbar items
var scrollFactor = 0;
bar.addEventListener("wheel", (e) => {
    if (
        !(scrollFactor - (e.deltaY || e.deltaX) >= 0) && // Left border not reached
        !(scrollFactor - (e.deltaY || e.deltaX) <= (container.scrollWidth - container.offsetWidth) * -1) // Right border not reached
    ) {
        console.log(e.deltaY, e.deltaX)
        scrollFactor -= e.deltaY || e.deltaX;
    } else if (scrollFactor - (e.deltaY || e.deltaX) >= 0) scrollFactor = 0; // Case for left border
    else scrollFactor = (container.scrollWidth - container.offsetWidth) * -1; // Case for left border
    container.style.setProperty("--toolbar-item-scroll", `${scrollFactor}px`);
})