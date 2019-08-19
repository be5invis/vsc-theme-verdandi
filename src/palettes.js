const color = require("onecolor");
const interpolate = require("./interpolate");

const GAMMA = 2.2;

function omap(obj, f) {
	let o1 = {};
	for (let k in obj) {
		o1[k] = f(k, obj[k]);
	}
	return o1;
}

function mix(a, b, x) {
	return a + (b - a) * x;
}

function cmix(colors, p) {
	let channels = { r: 0, g: 0, b: 0 };
	for (let channel of ["r", "g", "b"]) {
		const xs = colors.map((_, j) => j / (colors.length - 1));
		const ys = colors.map(c => Math.pow(c[channel](), 1 / GAMMA));
		channels[channel] = Math.pow(interpolate(xs, ys)(p), GAMMA);
	}
	return new color.RGB(channels.r, channels.g, channels.b);
}

function shades(colors, levels) {
	const a = [];
	for (let j = 0; j <= levels; j++) {
		a.push(cmix(colors, j / levels));
	}
	return a;
}

const light = omap(
	{
		gray: ["#f8f9fa", "#adb5bd", "#212529"],
		red: ["#fff5f5", "#ff6b6b", "#c92a2a"],
		orange: ["#fff8f4", "#ffa66b", "#c9692a"],
		green: ["#ebfbee", "#51cf66", "#2b8a3e"],
		blue: ["#e8f7ff", "#329af0", "#1862ab"],
		stress: ["#e8f7ff", "#329af0", "#1862ab"]
	},
	(k, g) => shades(g.map(color), 10)
);
const lightGrades = {
	libraryFunction: 10,
	dropdownBackground: 0,
	badgeForeground: 2,
	titleBarBackground: 8,
	titleBarForeground: 1
};

const alter = omap(
	{
		gray: ["#0f1216", "#4a535c", "#d8dce0"],
		red: ["#6e0000", "#dc0000", "#dd5e5e"],
		orange: ["#240d00", "#a64200", "#d77c40"],
		green: ["#08280e", "#33b949", "#7cd68e"],
		blue: ["#001f2f", "#107fdb", "#5da3e8"],
		stress: ["#001f2f", "#107fdb", "#5da3e8"]
	},
	(k, g) => shades(g.map(color), 10)
);
const alterGrades = {
	libraryFunction: 9, // We use a different grade for library functions in Alter
	dropdownBackground: 1,
	badgeForeground: 2,
	titleBarBackground: 2,
	titleBarForeground: 9
};

exports.light = light;
exports.alter = alter;
exports.lightGrades = lightGrades;
exports.alterGrades = alterGrades;
