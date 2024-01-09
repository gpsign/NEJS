import applyConfig from "./applyConfigs.js";
import { keyMap } from "./keymap.js";
import { applyMenus } from "./menus.js";
import { render } from "./render.js";
import { setObject } from "./utils.js";
import { world } from "./world.js";
import { PlayerClass } from "./classes/Player.js";
import { WallClass } from "./classes/Wall.js";

const player = new PlayerClass({
	xTile: 12,
	yTile: 14,
	width: 1,
	height: 1,
	spriteIndex: 16,
	debug: ["vy", "y", "bottom", "vertical", "horizontal"],
	layer: 1,
});

const wallA = new WallClass({
	xTile: 12,
	yTile: 12,
	width: 1,
	height: 1,
	spriteIndex: 66,
	name: "chão-dir",
});

const wallB = new WallClass({
	xTile: 1,
	yTile: 14,
	width: 4,
	height: 1,
	spriteIndex: 66,
	layer: 2,
	debug: ["top"],
});

player.bottomArea.showHitbox();
wallB.topArea.showHitbox();

player.rightArea.setContactHitboxColor("rgba(0, 255, 0, 0.5)");

export const instance = {
	game: undefined,
	isGameRunning: true,
	world,
	FPS: 75,
};

export const stateMemory = [];

let stateIndex = 99;

function nextFrame() {
	// if (stateIndex < stateMemory.length - 1) {
	// 	stateIndex++;
	// 	renderState();
	// } else
	// console.log(instance.world);
	window.requestAnimationFrame(() => render(instance));
}

function previousFrame() {
	if (stateIndex >= stateMemory.length - 1) stateIndex = stateMemory.length - 1;
	stateIndex--;
	renderState();
}

// function renderState() {
//   setObject(instance.world, stateMemory[stateIndex]);

//   renderImage(instance);
// }

export function start() {
	instance.game = setInterval(nextFrame, 1000 / instance.FPS);
}

document.addEventListener("keydown", (e) => {
	e.preventDefault();
	const key = e.key.toLowerCase();

	if (key === "r") location.reload();
	if (key === "." && !instance.isGameRunning) nextFrame();
	if (key === "," && !instance.isGameRunning) previousFrame();
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
applyMenus();
