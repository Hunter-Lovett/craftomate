// const bar = document.getElementById("toolbar")!;
const container = Array.from(document.getElementsByClassName("toolbar-container")!) as HTMLElement[];
const toolbarToggle = Array.from(document.getElementsByClassName("toolbar-toggle")!) as HTMLElement[];
const buildMenu = document.getElementById("build-menu")!;
const buildList = new Map([
    ["transport", document.getElementById("transport")!],
    ["buildings", document.getElementById("buildings")!],
])

// Scroll through toolbar items
var scrollFactor = 0;
container.forEach((cont) => {
    cont.addEventListener("wheel", (e) => {
        if (
            !(scrollFactor - (e.deltaY || e.deltaX) >= 0) && // Left border not reached
            !(scrollFactor - (e.deltaY || e.deltaX) <= (cont.scrollWidth - cont.offsetWidth) * -1) // Right border not reached
        ) {
            console.log(e.deltaY, e.deltaX)
            scrollFactor -= e.deltaY || e.deltaX;
        } else if (scrollFactor - (e.deltaY || e.deltaX) >= 0) scrollFactor = 0; // Case for left border
        else scrollFactor = (cont.scrollWidth - cont.offsetWidth) * -1; // Case for left border
        cont.style.setProperty("--toolbar-item-scroll", `${scrollFactor}px`);
    })
})

// Toggle build menus
toolbarToggle.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
        if(toggle.classList.contains("toggle-active")) {
            toggle.classList.remove("toggle-active");
            buildMenu.style.display = "none";
        } else {
            toolbarToggle.forEach((elem) => {
                elem.classList.remove("toggle-active");
            })
            buildList.forEach((elem) => {
                elem.style.display = "none";
            })
            buildList.get(toggle.dataset.menu!)!.style.display = "block";
            toggle.classList.add("toggle-active");
            buildMenu.style.display = "block";
        }
    })
})