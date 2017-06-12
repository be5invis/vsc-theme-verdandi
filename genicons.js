module.exports = function genicons() {
	const iconDefinitions = {};
	const defs = { dark: {}, light: {} };
	function deficon(id) {
		if (!iconDefinitions[id]) {
			iconDefinitions[id] = {
				iconPath: "./icons/" + id + ".svg"
			};
		}
		return id;
	}
	function define(p, icon) {
		for (let theme of ["dark", "light"]) {
			let hive = defs[theme];
			let path = p.slice(0);
			while (path.length > 1) {
				if (!hive[path[0]]) hive[path[0]] = {};
				hive = hive[path[0]];
				path = path.slice(1);
			}
			hive[path[0]] = deficon(icon + "-" + theme);
		}
	}
	function ext(x, icon) {
		return define(["fileExtensions", x], icon || x);
	}

	recipe.call({ define, ext });

	const final = defs.dark;
	final.light = defs.light;
	final.iconDefinitions = iconDefinitions;
	return final;
};

function recipe() {
	const { define, ext } = this;

	define(["folder"], "folder-close");
	define(["file"], "file");
	define(["folderExpanded"], "folder-open");
	ext("txt", "text");
	ext("c");
	ext("h");
	ext("hpp");
	ext("hh", "hpp");
	ext("hxx", "hpp");
	ext("cpp");
	ext("cc", "cpp");
	ext("cxx", "cpp");
	ext("js");
	ext("ts");
	ext("d.ts", "dts");
	ext("json");
}
