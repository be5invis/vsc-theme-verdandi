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

	function testfile(x, icon) {
		fn("test." + x, (icon || x) + "-test");
		fn("tests." + x, (icon || x) + "-test");
		fn("spec." + x, (icon || x) + "-test");
		fn("specs." + x, (icon || x) + "-test");
		ext("test." + x, (icon || x) + "-test");
		ext("tests." + x, (icon || x) + "-test");
		ext("spec." + x, (icon || x) + "-test");
		ext("specs." + x, (icon || x) + "-test");
	}

	recipe.call({ define, ext, fn, dir, testfile });

	const final = defs.dark;
	final.light = defs.light;
	final.iconDefinitions = iconDefinitions;
	return final;
};

function recipe() {
	const { define, ext, fn, dir, testfile } = this;

	define(["folder"], "folder-close");
	define(["file"], "file");
	define(["folderExpanded"], "folder-open");

	fn("license", "license");
	fn("licence", "license");
	fn("copying", "license");
	fn("license.txt", "license");
	fn("license.md", "license");
	fn("copying.md", "license");
	fn("licence.txt", "license");
	fn("licence.md", "license");
	fn("copying.md", "license");

	ext("txt", "text");
	ext("log", "text");
	ext("c");
	ext("h");
	ext("hpp");
	ext("hh", "hpp");
	ext("hxx", "hpp");
	ext("cpp");
	ext("cc", "cpp");
	ext("cxx", "cpp");
	ext("js");
	ext("jsx", "js");
	ext("mjs", "js");
	ext("md");
	ext("mkd", "md");
	ext("markdown", "md");
	ext("ts");
	ext("tsx", "ts");
	ext("d.ts", "dts");
	ext("py");
	ext("rb");
	ext("rs", "rust");
	ext("go");
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
	ext("vue");
	ext("toml");
	ext("tex");
	ext("css", "css");
	ext("styl", "stylus");
	ext("less");
	ext("sass");
	ext("scss", "sass");
	ext("ttf", "font");
	ext("otf", "font");
	ext("ttc", "font");
	ext("woff", "font");
	ext("woff2", "font");
	ext("eot", "font");
	ext("zip", "archive");
	ext("7z", "archive");
	ext("rar", "archive");
	ext("tar.gz", "archive");
	ext("tgz", "archive");
	ext("tar.bzip2", "archive");
	ext("tbz", "archive");
	ext("tar.xz", "archive");
	ext("txz", "archive");
	ext("gif", "image");
	ext("jpg", "image");
	ext("jpeg", "image");
	ext("png", "image");
	ext("psd", "image");
	ext("svg", "image-vector");
	ext("ai", "image-vector");
	ext("sketch", "image-vector");
	ext("fig", "image-vector");

	fn(".gitignore", "git");
	fn(".travis.yml", "travis");
	fn("azure-pipelines.yml", "azure-pipelines");
	fn("appveyor.yml", "appveyor");
	fn(".editorconfig", "config");
	fn(".clang-format", "config");
	fn("makefile", "config");
	fn(".esformatter", "config-js");
	fn(".eslintrc", "config-js");
	fn(".eslintignore", "config-js");
	fn(".babelrc", "config-js");
	fn("package.json", "npm");
	fn("package-lock.json", "file-npm");
	fn(".npmrc", "file-npm");
	fn(".npmignore", "file-npm");
	fn(".npmignore.json", "file-npm");
	fn(".prettierrc", "file-prettier");
	fn(".prettierrc.yaml", "file-prettier");
	fn(".prettierrc.yml", "file-prettier");
	fn(".prettierrc.json", "file-prettier");
	fn(".prettierrc.js", "file-prettier");
	fn("prettier.config.js", "file-prettier");

	testfile("ts");
	testfile("js");

	dir("test");
	dir("tests", "test");
	dir("spec", "test");
	dir(".vscode", "vscode");
	dir(".circleci", "circleci");
}
