import TileClass from "./classes/Tile.js";
import PalleteClass from "./classes/Pallette.js";
import ColorClass from "./classes/Color.js";
import MegaTile from "./classes/MegaTile.js";

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

	testMegaTile.render(10 * 16, 8 * 16);
}

const pallette_one = new PalleteClass(
	new ColorClass("transparent", 0, 0, 0, 0),
	new ColorClass("pink", 251, 208, 194),
	new ColorClass("brown", 153, 78, 5),
	new ColorClass("black", 0, 0, 0)
);

const pallette_two = new PalleteClass(
	new ColorClass("transparent", 0, 0, 0, 0),
	new ColorClass("pink", 251, 208, 194),
	new ColorClass("blue", 38, 123, 139),
	new ColorClass("black", 0, 0, 0)
);

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

const testTile = new TileClass(p, brick, pallette_two);
const testMegaTile = new MegaTile(testTile);

export { render, p, screen, widthRatio, heightRatio };
