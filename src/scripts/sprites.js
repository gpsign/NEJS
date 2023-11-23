import { start } from "./main.js";

export const Sprites = {
	TileSet: new Image(),
	array: [],
};

function iterateTileSet() {
	const promises = [];
	for (let i = 0; i < Sprites.TileSet.height; i += 16) {
		for (let j = 0; j < Sprites.TileSet.width; j += 16) {
			promises.push(createImageBitmap(Sprites.TileSet, i, j, 16, 16));
		}
	}
	return promises;
}

Sprites.TileSet.src = "../../public/assets/testTiles_2.png";
Sprites.TileSet.image;
Sprites.TileSet.onload = () => {
	Promise.all(iterateTileSet()).then((sprites) => {
		Sprites.array = sprites;
		start();
	});
};
