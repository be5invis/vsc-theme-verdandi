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
	function fn(x, icon) {
		return define(["fileNames", x], icon || x);
	}
	function dir(x, icon) {
		define(["folderNames", x], "folder-" + (icon || x) + "-close");
		define(["folderNamesExpanded", x], "folder-" + (icon || x) + "-open");
	}

	recipe.call({ define, ext, fn, dir });

	const final = defs.dark;
	final.light = defs.light;
	final.iconDefinitions = iconDefinitions;
	return final;
};

function recipe() {
	const { define, ext, fn, dir } = this;

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
	ext("md");
	ext("mkd", "md");
	ext("markdown", "md");
	ext("ts");
	ext("d.ts", "dts");
	ext("py");
	ext("rb");
	ext("hs");
	ext("idr");
	ext("json");
	ext("cs");
	ext("fs");
	ext("fsx", "fs");
	ext("fsi", "fs");
	ext("vb");
	ext("otd", "json");
	ext("make", "config");
	ext("html", "markup");
	ext("htm", "markup");
	ext("xml", "markup");
	ext("css", "css");
	ext("styl", "stylus");

	fn(".gitignore", "git");
	fn(".travis.yml", "travis");
	fn("appveyor.yml", "appveyor");
	fn(".editorconfig", "config");
	fn(".clang-format", "config");
	fn("makefile", "config");
	fn("package.json", "npm");
	fn("package-lock.json", "file-npm");
	fn(".npmignore.json", "file-npm");

	dir("test");
	dir("tests", "test");
	dir("spec", "test");
	dir(".vscode", "vscode");
}
