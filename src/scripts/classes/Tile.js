export default class TileClass {
	constructor(p, data, pallete, mirrored = false) {
		this.sprite = p.createImageData(8, 8);

		const aux = this.sprite.data;

		for (let i = 0; i < aux.length; i += 4) {
			aux[i] = 255;
            aux[i + 1] = 0;
            aux[i + 2] = 0;
		}

		console.log(this.sprite);
	}
	render(p) {
		p.putImageData(this.sprite, 130, 150);
	}
}
