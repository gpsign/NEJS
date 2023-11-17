import { keyMap } from "./keymap.js";
import { render } from "./render.js";
import { world } from "./world.js";

const instance = {
	game: undefined,
	world,
};
let isGameRunning = true;

const FPS = 60;

function start() {
	instance.game = setInterval(() => {
		window.requestAnimationFrame(() => render(instance));
	}, 1000 / FPS);
}
start();

document.addEventListener("keydown", (e) => {
	e.preventDefault();
	const key = e.key.toLowerCase();

	if (key === "r") location.reload();

	if (key === "enter") {
		isGameRunning ? clearInterval(instance.game) : start();

		isGameRunning = !isGameRunning;
	}
	keyMap[key] = true;
});

document.addEventListener("keyup", (e) => {
	const key = e.key.toLowerCase();
	keyMap[key] = false;
});
