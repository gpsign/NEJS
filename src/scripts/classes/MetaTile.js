import { heightRatio, widthRatio } from "../render.js";
import { Sprites } from "../sprites.js";

export default class MetaTileClass {
	constructor(tiles) {
		if (!tiles.push) {
			this.tiles = [tiles, tiles, tiles, tiles];
			this.size = 2 * tiles.size;
			this.childSize = tiles.size;
		} else {
			this.tiles = tiles;
			this.size = 2 * tiles[0].size;
			this.childSize = tiles[0].size;
		}
	}
	render(x, y) {
		const [firstTile, secondTile, thirdTile, fourthTile] = this.tiles;

		firstTile.render(x, y);
		secondTile.render(x + this.childSize * widthRatio, y);
		thirdTile.render(x, y + this.childSize * heightRatio);
		fourthTile.render(
			x + this.childSize * widthRatio,
			y + this.childSize * heightRatio
		);
	}
}
