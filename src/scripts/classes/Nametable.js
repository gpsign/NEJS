export default class NametableClass {
	constructor() {
		this.data = [];
		for (let i = 0; i < 32; i++) {
			for (let j = 0; j < 32; j++) this.data.push(0);
		}
	}
	push(tile) {}
}
