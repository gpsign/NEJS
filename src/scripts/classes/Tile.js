import { unfold } from "../utils.js";

export default class TileClass {
	constructor(p, data, pallete, mirrored = false) {
		this.sprite = p.createImageData(8, 8);

		const aux = this.sprite.data;
		const unfoldedData = unfold(data);

		let bitCounter = 0;


		for (let i = 0; i < unfoldedData.length; i++) {
			const pData = unfoldedData[i];
			const color = pallete.data[pData];

			aux[bitCounter] = color.r;
			aux[bitCounter + 1] = color.b;
			aux[bitCounter + 2] = color.g;
			aux[bitCounter + 3] = color.a;
			bitCounter += 4;
		}

		console.log(aux);

		this.sprite.data.set(aux);
	}
	render(p) {
		p.putImageData(this.sprite, 133, 153);
	}
}
