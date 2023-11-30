import ColorClass from "./classes/Color.js";
import PalleteClass from "./classes/Pallette.js";
import TilesetClass from "./classes/Tileset.js";
import { start } from "./main.js";

export const Sprites = {
	TileSet: new Image(),
	array: [],
	size: 8,
	tileSize: 8 * 2,
};

function iterateTileSet() {
	const promises = [];
	for (
		let tileLine = 0;
		tileLine < Sprites.TileSet.height;
		tileLine += Sprites.tileSize
	) {
		for (
			let tileColumn = 0;
			tileColumn < Sprites.TileSet.width;
			tileColumn += Sprites.tileSize
		) {
			promises.push(
				createImageBitmap(
					Sprites.TileSet,
					tileColumn,
					tileLine,
					Sprites.tileSize,
					Sprites.tileSize
				)
			);
		}
	}
	return promises;
}

Sprites.TileSet.src = "../../public/assets/testTiles.png";
Sprites.TileSet.image;
Sprites.TileSet.onload = () => {
	Promise.all(iterateTileSet()).then((sprites) => {
		Sprites.array = sprites;
		start();
	});
};
