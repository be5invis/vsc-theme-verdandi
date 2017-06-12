const path = require("path");
const fs = require("fs");

const gencolors = require("./gencolors");
const { light, alter } = require("./palettes");
const genicons = require("./genicons");

fs.writeFileSync(
	path.join(__dirname, "themes", "verdandi.json"),
	JSON.stringify(gencolors(light), null, "\t")
);
fs.writeFileSync(
	path.join(__dirname, "themes", "verdandi-alter.json"),
	JSON.stringify(gencolors(alter), null, "\t")
);
fs.writeFileSync(path.join(__dirname, "icons.json"), JSON.stringify(genicons(), null, "\t"));
