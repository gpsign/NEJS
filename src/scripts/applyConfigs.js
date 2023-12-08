import config from "./config.js";
import { screen } from "./render.js";
import { createPaintArea, createPalette, editor } from "./editor/render.js";

function applyConfig() {
	if (config.editorMode) {
		screen.style.display = "none";
		createPaintArea();
		createPalette();
	} else {
		editor.style.display = "none";
	}
}

export default applyConfig;
