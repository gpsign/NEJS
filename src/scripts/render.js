import MetaTileClass from "./classes/MetaTile.js";
import brickSprite from "./sprites/brick.js";
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

	groundArray.forEach((g) => g.render());
	brickArray.forEach((b) => b.render());
	brickSquareArray.forEach((bq) => bq.render());
}

const brick = brickSprite(p, palettes[1]);
const brickMetaTile = new MetaTileClass(brick);
const brickSquare = new MetaTileClass(brickMetaTile, 4, 1);

const ground = groundSprite(p, palettes[1]);
const groundMetaTile = new MetaTileClass(ground);
const groundSquare = new MetaTileClass(groundMetaTile, 4, 6);
const groundMegaSquare = new MetaTileClass(groundSquare, 7, 2);

const groundArray = [
	new MetaTileClass(groundMetaTile, 0, 13),
	new MetaTileClass(groundMetaTile, 2, 13),
	new MetaTileClass(groundMetaTile, 4, 13),
	new MetaTileClass(groundMetaTile, 6, 13),
	new MetaTileClass(groundMetaTile, 8, 13),
	new MetaTileClass(groundMetaTile, 10, 13),
	new MetaTileClass(groundMetaTile, 12, 13),
	new MetaTileClass(groundMetaTile, 14, 13),
];

const brickArray = [
	new MetaTileClass(brick, 0, 10),
	new MetaTileClass(brick, 0, 11),
	new MetaTileClass(brick, 0, 12),
	new MetaTileClass(brick, 15, 10),
	new MetaTileClass(brick, 15, 11),
	new MetaTileClass(brick, 15, 12),
	new MetaTileClass(brick, 2, 0),
	new MetaTileClass(brick, 3, 0),
	new MetaTileClass(brick, 4, 0),
	new MetaTileClass(brick, 5, 0),
	new MetaTileClass(brick, 6, 0),
	new MetaTileClass(brick, 7, 0),
	new MetaTileClass(brick, 8, 0),
	new MetaTileClass(brick, 9, 0),
	new MetaTileClass(brick, 10, 0),
	new MetaTileClass(brick, 11, 0),
	new MetaTileClass(brick, 12, 0),
	new MetaTileClass(brick, 13, 0),
];

const brickSquareArray = [
	new MetaTileClass(brickMetaTile, 5, 8),
	new MetaTileClass(brickMetaTile, 7, 8),
	new MetaTileClass(brickMetaTile, 9, 8),
];

export { render, p, screen, widthRatio, heightRatio };
