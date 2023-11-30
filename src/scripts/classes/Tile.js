import { heightRatio, widthRatio } from "../render.js";
import { Sprites } from "../sprites.js";
import { unfold, repeat } from "../utils.js";

export default class TileClass {
	constructor(p, CHR, pallete) {
		this.sprite = p.createImageData(
			Sprites.size * widthRatio,
			Sprites.size * heightRatio
		);
		this.pallete = pallete;
		this.data = CHR;
		this.p = p;

		const aux = this.sprite.data;
		const scaledLines = repeat(CHR, heightRatio);
		const scaledCHR = [];

		for (let i = 0; i < scaledLines.length; i++) {
			scaledCHR.push(repeat(scaledLines[i], widthRatio));
		}

		const unfoldedData = unfold(scaledCHR);

		let bitCounter = 0;

		for (let i = 0; i < unfoldedData.length; i++) {
			for (let j = 0; j < heightRatio; j++) {
				const pData = unfoldedData[i];
				const color = pallete.data[pData];

				aux[bitCounter] = color.r;
				aux[bitCounter + 1] = color.g;
				aux[bitCounter + 2] = color.b;
				aux[bitCounter + 3] = color.a;

				bitCounter += 4;
			}
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
