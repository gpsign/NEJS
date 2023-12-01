import { heightRatio, widthRatio } from "../render.js";
import { Sprites } from "../sprites.js";

export default class MetaTileClass {
	constructor(tiles) {
		if (!tiles.push) this.tiles = [tiles, tiles, tiles, tiles];
		else this.tiles = tiles;
	}
	render(x, y) {
		const [firstTile, secondTile, thirdTile, fourthTile] = this.tiles;

		firstTile.render(x, y);
		secondTile.render(x + Sprites.size * widthRatio, y);
		thirdTile.render(x, y + Sprites.size * heightRatio);
		fourthTile.render(
			x + Sprites.size * widthRatio,
			y + Sprites.size * heightRatio
		);
	}
}
