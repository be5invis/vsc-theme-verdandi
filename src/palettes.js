const color = require("onecolor");
const interpolate = require("./interpolate");

const GAMMA = 2.2;

function oMap(obj, f) {
	let o1 = {};
	for (let k in obj) {
		o1[k] = f(k, obj[k]);
	}
	return o1;
}

function mix(a, b, x) {
	return a + (b - a) * x;
}

function cMix(colors, p) {
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
		a.push(cMix(colors, j / levels));
	}
	return a;
}

function printPalette(pal) {
	for (const key in pal) {
		const a = pal[key];
		let s = key;
		while (s.length < 16) s = " " + s;
		s += " : ";
		for (const color of a) {
			const red = 0 | (color.r() * 0xff);
			const green = 0 | (color.g() * 0xff);
			const blue = 0 | (color.b() * 0xff);
			s += `\x1b[48;2;${red};${green};${blue}m   \x1b[0m`;
		}

		s += " Y: ";
		for (const color of a) {
			const light = 0 | (color.y() * 0xff);
			s += `\x1b[48;2;${light};${light};${light}m   \x1b[0m`;
		}
		console.log(s);
	}
}

const light = oMap(
	{
		gray: ["#f8f9fa", "#adb5bd", "#212529"],
		user: ["#f8f9fa", "#adb5bd", "#212529"],
		system: ["#f8f9fa", "#adb5bd", "#212529"],
		stress: ["#e8f7ff", "#329af0", "#1862ab"],
		red: ["#fff5f5", "#f56767", "#b92626"],
		orange: ["#fff8f4", "#df7b39", "#9f4700"],
		green: ["#ebfbee", "#41a952", "#216f30"],
		blue: ["#e8f7ff", "#329af0", "#1862ab"]
	},
	(k, g) => shades(g.map(color), 10)
);
const lightGrades = {
	libraryFunction: 10,
	dropdownBackground: 0,
	badgeBackground: 5,
	badgeForeground: 2,
	titleBarBackground: 8,
	titleBarForeground: 1
};

const alter = oMap(
	{
		gray: ["#0f1216", "#4a535c", "#d8dce0"],
		user: ["#0f1216", "#4a535c", "#d8dce0"],
		system: ["#0f1216", "#4a535c", "#d8dce0"],
		stress: ["#001f2f", "#1289ec", "#62abf3"],
		red: ["#2f0700", "#dd5e5e", "#fc8181"],
		orange: ["#2f0d00", "#ca700b", "#f88a10"],
		green: ["#08280e", "#3b994a", "#61b86b"],
		blue: ["#001f2f", "#1289ec", "#62abf3"]
	},
	(k, g) => shades(g.map(color), 10)
);
const alterGrades = {
	libraryFunction: 9, // We use a different grade for library functions in Alter
	dropdownBackground: 1,
	badgeBackground: 4,
	badgeForeground: 10,
	titleBarBackground: 2,
	titleBarForeground: 9
};

printPalette(light);
printPalette(alter);

function curXYZ(cur, ref) {
	return new color.XYZ(
		cur.x() * (ref.y() / cur.y()),
		ref.y(),
		cur.z() * (ref.y() / cur.y())
	).hex();
}

exports.light = light;
exports.alter = alter;
exports.lightGrades = lightGrades;
exports.alterGrades = alterGrades;
