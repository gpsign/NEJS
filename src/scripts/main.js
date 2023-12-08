import applyConfig from "./applyConfigs.js";
import { keyMap } from "./keymap.js";
import { render } from "./render.js";
import { world } from "./world.js";

export const instance = {
	game: undefined,
	isGameRunning: true,
	world,
	FPS: 75,
};

export function start() {
	instance.game = setInterval(() => {
		window.requestAnimationFrame(() => render(instance));
	}, 1000 / instance.FPS);
}

function oneStep() {
	window.requestAnimationFrame(() => render(instance));
}

document.addEventListener("keydown", (e) => {
	e.preventDefault();
	const key = e.key.toLowerCase();

	if (key === "r") location.reload();
	if (key === "." && !instance.isGameRunning) oneStep();
	if (key === "l") log();

	if (key === "enter") {
		instance.isGameRunning ? clearInterval(instance.game) : start();

		instance.isGameRunning = !instance.isGameRunning;
	}
	keyMap[key] = true;
});

document.addEventListener("keyup", (e) => {
	const key = e.key.toLowerCase();
	keyMap[key] = false;
});

applyConfig();
