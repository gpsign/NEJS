export default class Coordinate {
	constructor(x = 0, y = 0, ratio = 10000) {
		this.x = x;
		this.y = y;
		this.ratio = ratio;
	}
	get x() {
		return Math.floor(this.x / this.ratio);
	}
	get y() {
		return Math.floor(this.y / this.ratio);
	}
}
