const {writeFileSync, rmSync} = require("fs")
var size = 32
var coords = []
var main = `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"${size}\" height=\"${size}\" viewBox=\"0 0 ${size} ${size}\"><rect x="0" y="0" width=\"${size}\" height=\"${size}\" fill=\"#3ca84b\"/><g>`;

var colors = [
    "#3c723a",
    "#296326",
    "#1d7518",
    "#247720",
    "#5cb857",
    "#199137"
]

var file = __dirname + "/tile-grass.svg"

rmSync(file);

function random(limit, lower) {
    return Math.round(Math.random() * (limit + (lower < 0 ? lower * -1 : lower))) + lower;
}


for(var loop = 0; loop < colors.length; loop++) {
    main += `<path stroke="${colors[loop]}" stroke-width="1" d=\"`
    for(var i = 0; i < random(Math.floor((size * size) / colors.length), Math.floor((size * size) / (colors.length - 2))); i++) {
        var dot = [random(size, 0), random(size, 0)]
        if (!coords.includes(dot)) {
            main += `M${dot[0] + 0.5},${dot[1]}v1`;
            coords.push(dot);
        }
    }
    main += "\"/>"
}
main += "</g></svg>"

writeFileSync(file, main, {encoding: "utf8"});