export default class MegaTile {
	constructor(tiles) {
		if (!tiles.push) this.tiles = [tiles, tiles, tiles, tiles];
		else this.tiles = tiles;

		console.log(this.tiles);
	}
	render(x, y) {
		const [firstTile, secondTile, thirdTile, fourthTile] = this.tiles;

		firstTile.render(x, y);
		secondTile.render(x + 8, y);
		thirdTile.render(x, y + 8);
		fourthTile.render(x + 8, y + 8);
	}
}
