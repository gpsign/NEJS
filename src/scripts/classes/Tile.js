export default class TileClass {
	constructor(p, data, pallete, mirrored = false) {
		this.sprite = p.createImageData(8, 8);

		const aux = this.sprite.data;

		const tp = [
			[0, 0, 0, 0],
			[0, 0, 0, 255],
			[255, 255, 0, 255],
			[165, 42, 42, 255],
		];

		const teste = [
			[2, 2, 2, 2, 2, 2, 2, 2],
			[3, 3, 3, 3, 3, 3, 3, 3],
			[3, 3, 1, 3, 3, 1, 3, 3],
			[3, 3, 1, 3, 3, 1, 3, 3],
			[3, 1, 3, 3, 3, 3, 1, 3],
			[3, 3, 1, 3, 3, 1, 3, 3],
			[3, 3, 3, 1, 1, 3, 3, 3],
			[3, 3, 3, 3, 3, 3, 3, 3],
		];

		const ref = [];

		unclamp(teste, ref);
		console.log(ref);

		let bitCounter = 0;

		for (let i = 0; i < ref.length; i++) {
			const pData = ref[i];
			const color = tp[pData]


			console.log(color)

			aux[bitCounter] = color[0];
			aux[bitCounter + 1] = color[1];
			aux[bitCounter + 2] = color[2];
			aux[bitCounter + 3] = color[3];
			bitCounter += 4;
		}

		console.log(aux);

		this.sprite.data.set(aux);
	}
	render(p) {
		p.putImageData(this.sprite, 133, 153);
	}
}

function unclamp(arr, ref) {
	arr.forEach((value) => {
		if (value.push) unclamp(value, ref);
		else ref.push(value);
	});
}
