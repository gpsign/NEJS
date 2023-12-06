import { repeat } from "../utils.js";
import colors from "../sprites/colors.js";

let cursorColor = {};
const palette = document.getElementById("color-palette");
const editor = document.getElementById("editor");

function createPalette() {
	for (const [key, value] of Object.entries(colors)) {
		const paint = document.createElement("div");
		paint.classList.add("color");
		paint.style.backgroundColor = `rgba(${value.r}, ${value.g}, ${value.b}, ${value.a})`;
		paint.title = key;
		paint.onclick = () => {
			cursorColor = value;
		};

		palette.appendChild(paint);
	}
}

function createPaintArea() {
	repeat(() => {
		const pixel = document.createElement("div");
		pixel.classList.add("pixel");
		pixel.onclick = () => {
			pixel.style.backgroundColor = `rgba(${cursorColor.r}, ${cursorColor.g}, ${cursorColor.b}, ${cursorColor.a})`;
		};
		editor.appendChild(pixel);
	}, 64);
}

export { palette, editor, createPaintArea, createPalette };
