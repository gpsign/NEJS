import { config } from "./config.js";
import { screen } from "./render.js";
import { createPaintArea, createPalette } from "./editor/render.js";

function applyConfig() {
	let editor = document.getElementById("editor");
	const debug = document.getElementById("debug");
	const palette = document.getElementById("color-palette");

	if (config.editorMode) {
		screen.style.display = "none";
		debug.style.display = "none";
		
		if (editor.childNodes.length === 0) {
			createPaintArea();
			createPalette();
		}

		editor.style.display = "grid";
		palette.style.display = "flex";
		debug.style.display = "none";

		return;
	} else {
		screen.style.display = "block";
		editor.style.display = "none";
		palette.style.display = "none";
	}

	if (config.debugMode) {
		debug.style.display = "block";
	} else {
		debug.style.display = "none";
	}
}

export default applyConfig;
