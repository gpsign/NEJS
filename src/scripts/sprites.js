import { start } from "./main.js";

export const Sprites = {
	TileSet: new Image(),
	array: [],
	size: 16,
};

function iterateTileSet() {
	const promises = [];
	for (
		let tileLine = 0;
		tileLine < Sprites.TileSet.height;
		tileLine += Sprites.size
	) {
		for (
			let tileColumn = 0;
			tileColumn < Sprites.TileSet.width;
			tileColumn += Sprites.size
		) {
			promises.push(
				createImageBitmap(
					Sprites.TileSet,
					tileColumn,
					tileLine,
					Sprites.size,
					Sprites.size
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
