import MetaTileClass from "./classes/MetaTile.js";
import groundSprite from "./sprites/ground.js";
import palettes from "./sprites/palettes.js";

const screen = document.getElementById("screen");
const p = screen.getContext("2d");

const NESWidth = 256;
const NESHeight = 240;

const widthRatio = screen.width / NESWidth;
const heightRatio = screen.height / NESHeight;

function render(instance) {
	p.clearRect(0, 0, screen.width, screen.height);

	instance.world.entities.forEach((entity) => {
		entity.calculateMovement();
		entity.render();
	});

	instance.world.walls.forEach((walls) => {
		walls.render();
	});

	testMetaTile.render(3 * 16 * widthRatio, 13 * 16 * heightRatio);
}

const testMetaTile = new MetaTileClass(
	new MetaTileClass(groundSprite(p, palettes[0]))
);

export { render, p, screen, widthRatio, heightRatio };
