const color = require("onecolor");

color.RGB.prototype.hexaa = function() {
	var alphaString = Math.round(this._alpha * 255).toString(16);
	return "#" + this.hex().substr(1, 6) + "00".substr(0, 2 - alphaString.length) + alphaString;
};

function omap(obj, f) {
	let o1 = {};
	for (let k in obj) {
		o1[k] = f(k, obj[k]);
	}
	return o1;
}

function generate(palette) {
	const { gray, red, green, blue, stress: stresses } = palette;

	const bg = gray[0];
	const fg = gray[8];
	const stress = stresses[5];
	const border = gray[3];
	// token settings
	const variable = {
		fontStyle: "",
		foreground: fg.hex()
	};
	const keyword = {
		fontStyle: "bold",
		foreground: gray[10].hex()
	};
	const operator = keyword;
	const weakOperator = {
		fontStyle: "",
		foreground: gray[10].hex()
	};
	const literal = {
		fontStyle: "",
		foreground: gray[10].hex()
	};
	const comment = {
		fontStyle: "",
		foreground: gray[6].hex()
	};
	const library = {
		fontStyle: "",
		foreground: gray[10].hex()
	};
	const quote = {
		fontStyle: "italic",
		foreground: gray[7].hex()
	};
	const user = {
		fontStyle: "",
		foreground: gray[10].hex()
	};
	const punct = {
		fontStyle: "",
		foreground: gray[7].hex()
	};
	const invalid = {
		foreground: red[7].hex()
	};
	const access = {};

	return {
		$schema: "vscode://schemas/color-theme",
		name: "Railgun",
		palette: omap(palette, (k, g) => g.map(c => c.hex())),
		colors: {
			focusBorder: stress.hex(),
			foreground: fg.hex(),
			errorForeground: red[6].hex(),
			"editor.background": bg.hex(),
			"editor.foreground": fg.hex(),
			"editor.lineHighlightBackground": gray[1].hex(),
			"editorCursor.foreground": stress.hex(),
			"editorLineNumber.foreground": gray[5].hex(),
			"editorActiveLineNumber.foreground": gray[10].hex(),

			"editor.selectionBackground": stresses[2].hexaa(),
			"editor.selectionHighlightBackground": stresses[1].hexaa(),
			"editor.inactiveSelectionBackground": gray[3].hexaa(),

			"debugToolBar.background": gray[2].hexaa(),
			"editorWidget.background": gray[2].hexaa(),
			"editorSuggestWidget.background": bg.hexaa(),

			"editorGroup.border": border.hex(),
			"editorGroupHeader.noTabsBackground": bg.hex(),
			"editorGroupHeader.tabsBackground": gray[2].hex(),
			"tab.border": border.hex(),
			"tab.inactiveBackground": gray[2].hex(),
			"tab.inactiveForeground": gray[7].hex(),
			"tab.activeBackground": bg.hex(),
			"tab.activeForeground": gray[10].hex(),

			"peekViewEditor.background": gray[3].alpha(1 / 3).hexaa(),
			"peekViewTitle.background": gray[0].hexaa(),
			"peekView.border": border.hex(),

			"scrollbar.shadow": color("#000000")
				.alpha(0.1)
				.hexaa(),
			"scrollbarSlider.background": color("#000000")
				.alpha(0.075)
				.hexaa(),
			"scrollbarSlider.activeBackground": color("#000000")
				.alpha(0.15)
				.hexaa(),
			"scrollbarSlider.hoverBackground": color("#000000")
				.alpha(0.15)
				.hexaa(),

			"editorOverviewRuler.border": "#00000000",
			"editorGutter.modifiedBackground": blue[5].hex(),
			"editorGutter.addedBackground": green[5].hex(),
			"editorGutter.deletedBackground": red[5].hex(),
			"diffEditor.removedTextBackground": red[5].alpha(0.15).hexaa(),
			"diffEditor.insertedTextBackground": green[5].alpha(0.1).hexaa(),

			"sideBarTitle.foreground": gray[10].hex(),
			"sideBar.background": gray[1].hex(),
			"sideBarSectionHeader.background": gray[3].hex(),

			"list.highlightForeground": stresses[6].hex(),
			"list.hoverBackground": gray[3].hex(),
			"list.inactiveSelectionBackground": gray[5].alpha(0.3).hexaa(),
			"list.activeSelectionBackground": stress.alpha(0.25).hexaa(),
			"list.focusBackground": stress.alpha(0.25).hexaa(),
			"list.inactiveSelectionForeground": gray[10].hex(),
			"list.activeSelectionForeground": gray[10].hex(),
			"list.focusForeground": gray[10].hex(),

			"dropdown.background": gray[0].hex(),
			"dropdown.border": border.hex(),
			"dropdown.foreground": gray[8].hex(),

			"input.background": gray[0].hex(),
			"input.border": border.hex(),
			"input.foreground": gray[8].hex(),
			"input.placeholderForeground": gray[5].hex(),

			"button.background": stresses[6].hex(),
			"button.foreground": stresses[0].hex(),
			"button.hoverBackground": stresses[7].hex(),

			"badge.background": stress.hex(),
			"activityBar.background": gray[4].hex(),
			"activityBar.foreground": gray[9].hex(),

			"statusBar.background": gray[3].hex(),
			"statusBar.foreground": fg.hex(),
			"statusBar.noFolderBackground": gray[3].hex(),
			"statusBar.noFolderForeground": fg.hex(),
			"statusBar.debuggingBackground": gray[3].hex(),
			"statusBar.debuggingForeground": fg.hex(),

			"panel.border": border.hex(),
			"panelTitle.activeBorder": stress.hex()
		},
		tokenColors: [
			{
				name: "Variable and parameter name",
				scope: ["variable", "meta.definition.variable.name", "support.variable"],
				settings: variable
			},
			{
				name: "Object keys, TS grammar specific",
				scope: ["meta.object-literal.key", "meta.object-literal.key entity.name.function"],
				settings: variable
			},
			{
				name: "Comment",
				scope: ["comment", "punctuation.comment", "punctuation.definition.comment"],
				settings: comment
			},
			{
				name: "Operator",
				scope: ["keyword.operator"],
				settings: operator
			},
			{
				name: "Punctuation",
				scope: [
					"punctuation",
					"delimiter",
					"bracket",
					"brace",
					"paren",
					"delimiter.tag",
					"punctuation.tag",
					"tag.html",
					"tag.xml",
					"meta.property-value punctuation.separator.key-value",
					"punctuation.definition.metadata.md",
					"string.link.md",
					"meta.brace"
				],
				settings: punct
			},
			{
				name: "JavaScript string interpolation ${}",
				scope: [
					"punctuation.definition.template-expression.begin.js",
					"punctuation.definition.template-expression.begin.ts",
					"punctuation.definition.template-expression.end.ts",
					"punctuation.definition.template-expression.end.js",
					"punctuation.section.embedded.begin.metatag.php",
					"punctuation.section.embedded.end.metatag.php"
				],
				settings: weakOperator
			},
			{
				name: "String",
				scope: [
					"string",
					"meta.property-value.string",
					"support.constant.property-value.string",
					"meta.structure.dictionary.value.json string.quoted.double.json",
					"meta.structure.dictionary.json string.quoted.double.json",
					"meta.preprocessor string"
				],
				settings: quote
			},
			{
				name: "Primitive Literals",
				scope: [
					"constant.numeric",
					"meta.property-value.numeric",
					"support.constant.property-value.numeric",
					"meta.property-value.color",
					"support.constant.property-value.color",
					"constant.language"
				],
				settings: literal
			},
			{
				name: "User names",
				scope: [
					"constant.character",
					"constant.other",
					"entity.name.function",
					"entity.name.class",
					"entity.other.inherited-class",
					"entity.other.attribute-name",
					"entity.name",
					"entity.other.attribute-name",
					"entity.other.attribute-name.html",
					"support.type.property-name",
					"entity.name.tag.table",
					"meta.structure.dictionary.json string.quoted.double.json"
				],
				settings: user
			},
			{
				name: "Keyword",
				scope: [
					"keyword",
					"meta.property-value.keyword",
					"support.constant.property-value.keyword",
					"meta.preprocessor.keyword",
					"keyword.other.use",
					"keyword.other.function.use",
					"keyword.other.namespace",
					"keyword.other.new",
					"keyword.other.special-method",
					"keyword.other.unit",
					"keyword.other.use-as"
				],
				settings: keyword
			},
			{
				name: "Storage",
				scope: [
					"storage",
					"storage.type",
					"storage.type.ts",
					"storage.type.var.ts",
					"storage.type.js",
					"storage.type.var.js",
					"storage.type.const.ts",
					"storage.type.let.ts",
					"storage.type.let.js",
					"storage.type.const.js",
					"entity.name.tag"
				],
				settings: keyword
			},
			{
				name: "Pointer, access, etc",
				scope: ["meta.ptr", "meta.pointer", "meta.address", "meta.array.cxx"],
				settings: access
			},
			{
				name: "Preprocessor",
				scope: "meta.preprocessor",
				settings: user
			},
			{
				name: "Library",
				scope: ["support.type", "support.class", "support.function", "support.constant"],
				settings: library
			},
			{
				name: "Invalid",
				scope: "invalid",
				settings: invalid
			},
			{
				name: "Invalid deprecated",
				scope: ["invalid.deprecated"],
				settings: invalid
			},
			{
				name: "Markdown Title Hash",
				scope: [
					"punctuation.definition.heading.md",
					"entity.name.type.md",
					"beginning.punctuation"
				],
				settings: user
			},
			{
				name: "Markdown titles",
				scope: ["markup.heading", "entity.name.section"],
				settings: keyword
			},
			{
				name: "Markdown Raw",
				scope: ["markup.raw", "markup.inline.raw", "markup.fenced", "markup.fenced_code"],
				settings: quote
			},
			{
				name: "Markdown link",
				scope: [
					"markup.link",
					"string.other.link.title",
					"string.other.link.description",
					"meta.link.inline",
					"meta.image.inline"
				],
				settings: user
			},
			{
				name: "Makefile Variables",
				scope: ["variable.language.makefile", "variable.other.makefile"],
				settings: user
			},
			{
				scope: ["markup.italic"],
				settings: {
					fontStyle: "italic"
				}
			},
			{
				scope: ["markup.bold"],
				settings: {
					fontStyle: "bold"
				}
			},
			{
				name: "CSS Class",
				scope: ["entity.other.attribute-name.class.css"],
				settings: library
			},
			{
				name: "CSS Tag name",
				scope: ["entity.name.tag.css"],
				settings: keyword
			},
			{
				name: "CSS Property",
				scope: ["meta.property-name.css"],
				settings: user
			}
		]
	};
}

module.exports = generate;
