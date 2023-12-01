import TileClass from "../classes/Tile.js";

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

function brickSprite(p, pallette) {
	return new TileClass(p, brick, pallette);
}

export default brickSprite;
