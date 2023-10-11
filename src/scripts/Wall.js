import { p } from "./render.js";

export class WallClass {
	constructor(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.top = this.y;
		this.right = this.x + this.width;
		this.bottom = this.y + this.height;
		this.left = this.x;
	}

	render() {
		p.fillStyle = this.color;
		p.fillRect(this.x, this.y, this.width, this.height);
	}
}
