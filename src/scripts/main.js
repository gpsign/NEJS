import { keyMap } from "./keymap.js";
import { PlayerClass } from "./Player.js";
import { render } from "./render.js";

const instance = {
	game: undefined,
	entities: [new PlayerClass(220, 220, "red")],
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
