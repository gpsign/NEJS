import MetaTileClass from "../classes/MetaTile.js";
import TileClass from "../classes/Tile.js";

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
	[1, 3, 2, 1, 1, 1, 1, 1],
	[2, 3, 1, 2, 2, 2, 2, 3],
	[2, 3, 1, 2, 2, 2, 2, 3],
	[2, 3, 1, 2, 2, 2, 2, 3],
	[2, 3, 1, 3, 2, 2, 2, 3],
	[2, 3, 2, 3, 3, 3, 3, 2],
	[2, 3, 1, 1, 1, 1, 1, 3],
	[2, 3, 1, 2, 2, 2, 2, 3],
];

const ground_three = [
	[1, 2, 2, 2, 2, 2, 2, 2],
	[1, 2, 2, 2, 2, 2, 2, 2],
	[3, 3, 2, 2, 2, 2, 2, 2],
	[1, 1, 3, 3, 2, 2, 2, 2],
	[1, 2, 1, 1, 3, 3, 3, 3],
	[1, 2, 2, 2, 1, 1, 1, 3],
	[1, 2, 2, 2, 2, 2, 2, 3],
	[2, 3, 3, 3, 3, 3, 3, 2],
];

const ground_four = [
	[2, 3, 1, 2, 2, 2, 2, 3],
	[2, 3, 1, 2, 2, 2, 2, 3],
	[3, 1, 2, 2, 2, 2, 2, 3],
	[3, 1, 2, 2, 2, 2, 2, 3],
	[1, 2, 2, 2, 2, 2, 2, 3],
	[1, 2, 2, 2, 2, 2, 2, 3],
	[1, 2, 2, 2, 2, 2, 3, 3],
	[1, 3, 3, 3, 3, 3, 3, 2],
];

function groundSprite(p, pallete) {
	return [
		new TileClass(p, ground_one, pallete),
		new TileClass(p, ground_two, pallete),
		new TileClass(p, ground_three, pallete),
		new TileClass(p, ground_four, pallete),
	];
}

export default groundSprite;
