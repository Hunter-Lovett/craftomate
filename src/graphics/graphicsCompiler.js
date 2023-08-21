const fs = require("fs");
const {join, extname} = require("path");

// Collect all files
var cache = {};
console.log("Finding files...");
function dirSearch(dir) {
    fs.readdirSync(dir).forEach((file) => {
        var path = join(dir, file)
        if(fs.statSync(path).isDirectory()) dirSearch(path);
        else if (extname(path) == ".svg") {
            // Get file data
            console.log("Processing " + path);
            var data = fs.readFileSync(path, {encoding:"utf8"}).replace(/\n\s*\</gm, "<").replace(/\n\s*/gm, " ");
            path = path.replace(".svg", "").split(__dirname + "/")[1].split("/").join(".");
            // Store texture
            cache[path] = data;
        }
    })
}
dirSearch(__dirname);

fs.writeFileSync(join(__dirname, "../data/textureManifest.json"), JSON.stringify(cache), {encoding:"utf8"});
