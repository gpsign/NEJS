import { heightRatio, widthRatio } from "../render.js";
import { Sprites } from "../sprites.js";
import { isValid, repeat, repeatArrayValues } from "../utils.js";
import AreaClass from "./Area.js";

export default class MetaTileClass extends AreaClass {
	constructor(tiles, xPosition = 0, yPosition = 0) {
		if (!tiles.push) {
			const cloned = [];
			repeat(() => cloned.push(tiles.clone()), 4);

			super(
				xPosition * Sprites.tileSize,
				yPosition * Sprites.tileSize,
				2 * tiles.width,
				2 * tiles.height
			);

			this.tiles = cloned;
			this.childSize = tiles.size;
			this.positionTiles();
		} else {
			super(
				xPosition * Sprites.tileSize,
				yPosition * Sprites.tileSize,
				2 * tiles[0].width,
				2 * tiles[0].height,
				1,
				1
			);

			this.tiles = tiles;

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

		first.x = this.x;
		first.y = this.y;
		if (first.positionTiles) first.positionTiles();

		first.update();

		second.x = first.xWidth;
		second.y = first.y;
		if (second.positionTiles) second.positionTiles();

		second.update();

		third.x = first.x;
		third.y = first.yHeight;
		if (third.positionTiles) third.positionTiles();

		third.update();

		fourth.x = third.xWidth;
		fourth.y = third.y;
		if (fourth.positionTiles) fourth.positionTiles();
	}
}
