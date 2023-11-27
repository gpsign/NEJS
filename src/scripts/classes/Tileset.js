export default class TilesetClass {
	constructor() {
		this.data = [];
		for (let i = 0; i < 16; i++) {
			const aux = [];
			for (let j = 0; j < 16; j++) {
				aux.push(0);
			}
			this.data.push(aux);
		}
	}
	push(tile) {
		for (let i = 0; i < 16; i++) {
			for (let j = 0; j < 16; j++) {
				if (this.data[i][j] === 0) {
					this.data[i][j] = tile;
					return;
				}
			}
		}
	}
}
