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
function invert(c) {
	return c.lightness(1 - c.lightness()).rgb();
}

const light = omap(
	{
		gray: ["#f8f9fa", "#adb5bd", "#212529"],
		red: ["#fff5f5", "#ff6b6b", "#c92a2a"],
		green: ["#ebfbee", "#51cf66", "#2b8a3e"],
		blue: ["#e8f7ff", "#329af0", "#1862ab"]
	},
	(k, g) => shades(g.map(color), 10)
);
light.stress = light.blue;

const alter = omap(light, (k, g) => g.map(invert));

exports.light = light;
exports.alter = alter;
