import { start } from "./main.js";

export const Sprites = {
	TileSet: new Image(),
	array: [],
};

function iterateTileSet() {
	const promises = [];
	for (let i = 0; i < Sprites.TileSet.height; i += 8) {
		for (let j = 0; j < Sprites.TileSet.width; j += 8) {
			promises.push(createImageBitmap(Sprites.TileSet, i, j, 8, 8));
		}
	}
	return promises;
}

Sprites.TileSet.src = "../../public/assets/TileSet.bmp";
Sprites.TileSet.image;
Sprites.TileSet.onload = () => {
	Promise.all(iterateTileSet()).then((sprites) => {
		Sprites.array = sprites;
		start();
	});
};
