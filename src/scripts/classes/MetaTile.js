import { heightRatio, widthRatio } from "../render.js";
import { Sprites } from "../sprites.js";
import { isValid, repeat, repeatArrayValues } from "../utils.js";

export default class MetaTileClass {
	constructor(tiles, xPosition = 0, yPosition = 0) {
		this.xPosition = xPosition * Sprites.tileSize * widthRatio;
		this.yPosition = yPosition * Sprites.tileSize * heightRatio;

		if (!tiles.push) {
			const cloned = [];
			repeat(() => cloned.push(tiles.clone()), 4);

			this.tiles = cloned;

			this.width = 2 * tiles.width;
			this.height = 2 * tiles.height;

			this.childSize = tiles.size;
			this.positionTiles();
		} else {
			this.tiles = tiles;

			this.width = 2 * tiles[0].width;
			this.height = 2 * tiles[0].height;

			this.childSize = tiles[0].size;
			this.positionTiles();
		}
	}
	render() {
		this.tiles.forEach((tile) => {
			tile.render && tile.render();
		});
	}
	clone() {
		const clonedTiles = this.tiles.map((tile) => tile.clone());
		return new MetaTileClass(clonedTiles);
	}
	positionTiles() {
		let [first, second, third, fourth] = this.tiles;

		first.xPosition = this.xPosition;
		first.yPosition = this.yPosition;
		if (first.positionTiles) first.positionTiles();

		second.xPosition = first.xPosition + first.width;
		second.yPosition = first.yPosition;
		if (second.positionTiles) second.positionTiles();

		third.xPosition = first.xPosition;
		third.yPosition = first.yPosition + first.height;
		if (third.positionTiles) third.positionTiles();

		fourth.xPosition = third.xPosition + third.width;
		fourth.yPosition = third.yPosition;
		if (fourth.positionTiles) fourth.positionTiles();
	}
}
