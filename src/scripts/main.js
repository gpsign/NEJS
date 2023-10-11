import { keyMap } from "./keymap.js";
import { render } from "./render.js";
import { world } from "./world.js";

const instance = {
	game: undefined,
	world,
};
let isGameRunning = true;

window.requestAnimationFrame(() => render(instance));

document.addEventListener("keydown", (e) => {
	e.preventDefault();
	const key = e.key.toLowerCase();

	if (key === "r") location.reload();

	if (key === "enter") {
		isGameRunning
			? window.cancelAnimationFrame(instance.game)
			: (instance.game = window.requestAnimationFrame(() => render(instance)));

		isGameRunning = !isGameRunning;
	}
	keyMap[key] = true;
});

document.addEventListener("keyup", (e) => {
	const key = e.key.toLowerCase();
	keyMap[key] = false;
});
