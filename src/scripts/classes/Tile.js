import { heightRatio, widthRatio } from "../render.js";
import { Sprites } from "../sprites.js";
import { unfold, repeatArrayValues, isValid, scaleMatrice } from "../utils.js";

export default class TileClass {
	constructor(p, CHR, pallete, xPosition = 0, yPosition = 0) {
		this.xPosition = xPosition * Sprites.size * widthRatio;
		this.yPosition = yPosition * Sprites.size * heightRatio;

		this.width = Sprites.size * widthRatio;
		this.height = Sprites.size * heightRatio;

		this.sprite = p.createImageData(this.width, this.height);
		this.pallete = pallete;
		this.p = p;
		this.CHR = CHR;
		this.scaledCHR = scaleMatrice(CHR, widthRatio, heightRatio);

		const dataCanvas = this.sprite.data;

		const unfoldedData = unfold(this.scaledCHR);

		let bitCounter = 0;

		for (let i = 0; i < unfoldedData.length; i++) {
			for (let j = 0; j < widthRatio; j++) {
				const pData = unfoldedData[i];
				const color = pallete.data[pData];

				dataCanvas[bitCounter] = color.r;
				dataCanvas[bitCounter + 1] = color.g;
				dataCanvas[bitCounter + 2] = color.b;
				dataCanvas[bitCounter + 3] = color.a;

				bitCounter += 4;
			}
		}

		this.sprite.data.set(dataCanvas);
	}
	render() {
		if (isValid(this.xPosition, this.yPosition))
			this.p.putImageData(this.sprite, this.xPosition, this.yPosition);
	}
	mirror() {
		const aux = this.sprite.data;

		const mirrorData = this.scaledCHR.map((line) => line.reverse());
		const unfoldedData = unfold(mirrorData);

		let bitCounter = 0;

		for (let i = 0; i < unfoldedData.length; i++) {
			for (let j = 0; j < widthRatio; j++) {
				const pData = unfoldedData[i];
				const color = this.pallete.data[pData];

				aux[bitCounter] = color.r;
				aux[bitCounter + 1] = color.g;
				aux[bitCounter + 2] = color.b;
				aux[bitCounter + 3] = color.a;
				bitCounter += 4;
			}
		}

		this.sprite.data.set(aux);
	}
	clone() {
		return new TileClass(
			this.p,
			this.CHR,
			this.pallete,
			this.xPosition,
			this.yPosition
		);
	}
}
