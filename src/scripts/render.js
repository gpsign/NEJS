import TileClass from "./classes/Tile.js";
import ColorClass from "./classes/Color.js";
import PalleteClass from "./classes/Pallette.js";

const screen = document.getElementById("screen");
const p = screen.getContext("2d");

const NESWidth = 256;
const NESHeight = 240;

//const widthRatio = screen.width / NESWidth;
//const heightRatio = screen.height / NESHeight;

const widthRatio = 1;
const heightRatio = 1;

function render(instance) {
	p.clearRect(0, 0, screen.width, screen.height);

	instance.world.entities.forEach((entity) => {
		entity.calculateMovement();
		entity.render();
	});

	instance.world.walls.forEach((walls) => {
		walls.render();
	});
	test.render(p);
}

const ye = new ColorClass("ye", 255, 255, 0, 255);
const br = new ColorClass("br", 165, 42, 42);
const bl = new ColorClass("bl");

const smile = [
	[2, 2, 2, 2, 2, 2, 2, 2],
	[3, 3, 3, 3, 3, 3, 3, 3],
	[3, 3, 1, 3, 3, 1, 3, 3],
	[3, 3, 1, 3, 3, 1, 3, 3],
	[3, 2, 3, 3, 3, 3, 1, 3],
	[3, 3, 3, 3, 3, 3, 3, 3],
	[3, 3, 3, 3, 3, 3, 3, 3],
	[3, 3, 3, 3, 3, 3, 3, 3],
];

const pallete = new PalleteClass(bl, bl, br, ye);

const test = new TileClass(p, smile, pallete);

export { render, p, screen, widthRatio, heightRatio };
