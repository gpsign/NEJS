import { heightRatio, widthRatio } from "../render.js";
import { contains } from "../utils.js";

export default class AreaClass {
	constructor(
		x,
		y,
		width,
		height,
		widthScale = widthRatio,
		heightScale = heightRatio
	) {
		this.x = x * widthScale;
		this.y = y * heightScale;
		this.width = width * widthScale;
		this.height = height * heightScale;

		this.xWidth = this.x + this.width;
		this.yHeight = this.y + this.height;

		this.data = [this.x, this.y, this.width, this.height];

		this.topLeft = [this.x, this.y];
		this.topRight = [this.x + this.width, this.y];
		this.bottomLeft = [this.x, this.y + this.height];
		this.bottomRight = [this.x + this.width, this.y + this.height];

		this.points = [
			this.topLeft,
			this.topRight,
			this.bottomLeft,
			this.bottomRight,
		];
	}
	static update() {
		this.topLeft = [this.x, this.y];
		this.topRight = [this.x + this.width, this.y];
		this.bottomLeft = [this.x, this.y + this.height];
		this.bottomRight = [this.x + this.width, this.y + this.height];

		this.data = [this.x, this.y, this.width, this.height];

		this.xWidth = this.x + this.width;
		this.yHeight = this.y + this.height;

		this.points = [
			this.topLeft,
			this.topRight,
			this.bottomLeft,
			this.bottomRight,
		];
	}
	isPointInside(point) {
		const [pointX, pointY] = point;

		return (
			contains(pointX, this.x, this.xWidth) &&
			contains(pointY, this.y, this.yHeight)
		);
	}
	isInsideArea(area) {
		for (const point of this.points) if (area.isPointInside(point)) return true;

		return false;
	}
}

const A = new AreaClass(1, 1, 2, 2);
const B = new AreaClass(3, 3, 5, 5);

console.log(A.isInsideArea(B));
