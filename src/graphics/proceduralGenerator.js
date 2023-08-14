const {writeFileSync, rmSync} = require("fs")
var size = 64
var coords = []
var mainColor = "#a3854d"
var main = `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"${size}\" height=\"${size}\" viewBox=\"0 0 ${size} ${size}\"><rect x="0" y="0" width=\"${size}\" height=\"${size}\" fill=\"${mainColor}\"/>`;

var colors = [
    "#4d3407",
    "#53462d",
    "#795f2e",
    "#3b2c10"
]
main += `\n<!-- colors = [${colors}] -->\n`;

var file = __dirname + "/map/soil.svg";

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
main += "</svg>"

writeFileSync(file, main, {encoding: "utf8"});