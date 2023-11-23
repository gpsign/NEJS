import { p } from "../render.js";

export class WallClass {
	constructor(xTile, yTile, width, height, color) {
		this.x = 16 * xTile;
		this.y = 16 * yTile;
		this.width = 16 * width;
		this.height = 16 * height;

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
