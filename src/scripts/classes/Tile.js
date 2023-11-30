import { unfold } from "../utils.js";

export default class TileClass {
	constructor(p, CHR, pallete) {
		this.sprite = p.createImageData(8, 8);
		this.pallete = pallete;
		this.data = CHR;
		this.p = p;

		const aux = this.sprite.data;
		const unfoldedData = unfold(CHR);

		let bitCounter = 0;

		for (let i = 0; i < unfoldedData.length; i++) {
			const pData = unfoldedData[i];
			const color = pallete.data[pData];

			aux[bitCounter] = color.r;
			aux[bitCounter + 1] = color.g;
			aux[bitCounter + 2] = color.b;
			aux[bitCounter + 3] = color.a;
			bitCounter += 4;
		}

		this.sprite.data.set(aux);
	}
	render(x, y) {
		this.p.putImageData(this.sprite, x, y);
	}
	mirror() {
		const aux = this.sprite.data;

		const mirrorData = this.data.map((line) => line.reverse());
		const unfoldedData = unfold(mirrorData);

		let bitCounter = 0;

		for (let i = 0; i < unfoldedData.length; i++) {
			const pData = unfoldedData[i];
			const color = this.pallete.data[pData];

			aux[bitCounter] = color.r;
			aux[bitCounter + 1] = color.g;
			aux[bitCounter + 2] = color.b;
			aux[bitCounter + 3] = color.a;
			bitCounter += 4;
		}

		this.sprite.data.set(aux);
	}
}
