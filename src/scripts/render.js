import TileClass from "./classes/Tile.js";
import PalleteClass from "./classes/Pallette.js";
import ColorClass from "./classes/Color.js";
import MetaTileClass from "./classes/MetaTile.js";

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

	testMetaTile.render(12 * 16, 8 * 16);
}

const pallette_one = new PalleteClass(
	new ColorClass("transparent", 0, 0, 0, 0),
	new ColorClass("pink", 251, 208, 194),
	new ColorClass("brown", 153, 78, 5),
	new ColorClass("black", 0, 0, 0)
);

const pallette_two = new PalleteClass(
	new ColorClass("transparent", 0, 0, 0, 0),
	new ColorClass("white", 255, 255, 255),
	new ColorClass("blue", 38, 123, 139),
	new ColorClass("black", 0, 0, 0)
);

const ground_one = [
	[2, 1, 1, 1, 1, 1, 1, 1],
	[1, 2, 2, 2, 2, 2, 2, 2],
	[1, 2, 2, 2, 2, 2, 2, 2],
	[1, 2, 2, 2, 2, 2, 2, 2],
	[1, 2, 2, 2, 2, 2, 2, 2],
	[1, 2, 2, 2, 2, 2, 2, 2],
	[1, 2, 2, 2, 2, 2, 2, 2],
	[1, 2, 2, 2, 2, 2, 2, 2],
];


const ground_two = [
	[1, 1, 1, 2, 1, 1, 1, 1],
	[2, 2, 3, 1, 2, 2, 2, 3],
	[2, 2, 3, 1, 2, 2, 2, 3],
	[2, 2, 3, 1, 2, 2, 2, 3],
	[2, 2, 3, 1, 3, 2, 2, 3],
	[2, 2, 3, 3, 3, 3, 3, 2],
	[2, 2, 3, 2, 1, 1, 1, 3],
	[2, 2, 2, 2, 2, 2, 2, 3],
];

const ground_three = [
	[2, 1, 1, 1, 1, 1, 1, 1],
	[2, 2, 2, 2, 2, 2, 2, 3],
	[2, 2, 2, 2, 2, 2, 2, 3],
	[3, 3, 3, 3, 3, 3, 3, 3],
	[2, 2, 2, 3, 2, 2, 2, 2],
	[2, 2, 2, 3, 2, 2, 2, 2],
	[2, 2, 2, 3, 2, 2, 2, 2],
	[3, 3, 3, 3, 3, 3, 3, 3],
];



const ground_four = [
	[2, 1, 1, 1, 1, 1, 1, 1],
	[2, 2, 2, 2, 2, 2, 2, 3],
	[2, 2, 2, 2, 2, 2, 2, 3],
	[3, 3, 3, 3, 3, 3, 3, 3],
	[2, 2, 2, 3, 2, 2, 2, 2],
	[2, 2, 2, 3, 2, 2, 2, 2],
	[2, 2, 2, 3, 2, 2, 2, 2],
	[3, 3, 3, 3, 3, 3, 3, 3],
];


const brick = [
	[2, 2, 2, 2, 2, 2, 2, 3],
	[2, 2, 2, 2, 2, 2, 2, 3],
	[2, 2, 2, 2, 2, 2, 2, 3],
	[3, 3, 3, 3, 3, 3, 3, 3],
	[2, 2, 2, 3, 2, 2, 2, 2],
	[2, 2, 2, 3, 2, 2, 2, 2],
	[2, 2, 2, 3, 2, 2, 2, 2],
	[3, 3, 3, 3, 3, 3, 3, 3],
];

//const testTile = new TileClass(p, ground, pallette_two);

const testMetaTile = new MetaTileClass([
	new TileClass(p, ground_one, pallette_two),
	new TileClass(p, ground_two, pallette_two),
	new TileClass(p, ground_three, pallette_two),
	new TileClass(p, ground_four, pallette_two),
]);

export { render, p, screen, widthRatio, heightRatio };
