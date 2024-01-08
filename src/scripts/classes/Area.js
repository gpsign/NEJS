import { heightRatio, p as canvasPainter, widthRatio } from "../render.js";
import { contains } from "../utils.js";
import { world } from "../world.js";

export default class AreaClass {
	constructor(
		x,
		y,
		width,
		height,
		widthScale = widthRatio,
		heightScale = heightRatio,
		child = false
	) {
		this.child = child;

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

		this.top = this.y;
		this.right = this.xWidth;
		this.left = this.x;
		this.bottom = this.yHeight;

		this.points = [
			this.topLeft,
			this.topRight,
			this.bottomLeft,
			this.bottomRight,
		];

		this.clock = world.clock;

		if (!child) {
			this.rightArea = this.getRightArea();
		}
	}
	getRightArea() {
		return new AreaClass(
			this.x + this.width / 2,
			this.y,
			this.width / 2,
			this.height,
			1,
			1,
			true
		);
	}
	update() {
		this.top = this.y;
		this.right = this.xWidth;
		this.left = this.x;
		this.bottom = this.yHeight;

		this.topLeft = [this.x, this.y];
		this.topRight = [this.xWidth, this.y];
		this.bottomLeft = [this.x, this.y];
		this.bottomRight = [this.xWidth, this.yHeight];

		this.data = [this.x, this.y, this.width, this.height];

		this.xWidth = this.x + this.width;
		this.yHeight = this.y + this.height;

		this.points = [
			this.topLeft,
			this.topRight,
			this.bottomLeft,
			this.bottomRight,
		];

		if (!this.child) {
			const right = this.rightArea;
			right.x = this.x + this.width / 2;
			right.y = this.y;
			right.width = this.width / 2;
			right.height = this.height;
		}
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
	isInsideAreaTop(area) {
		const topArea = new AreaClass(
			area.x,
			area.y,
			area.width,
			area.height / 2,
			1,
			1
		);

		return this.isInsideArea(topArea);
	}
	isInsideAreaRight(area) {
		const result = this.isInsideArea(area.rightArea);
		return result;
	}
	renderHitbox(color = "rgba(255, 0, 0, 0.5)") {
		if (this.hitbox && this.clock != world.clock) {
			this.clock = world.clock;
			canvasPainter.fillStyle = color;
			canvasPainter.fillRect(this.x, this.y, this.width, this.height);
		}

		if (!this.child) {
			this.rightArea.renderHitbox();
		}
	}

	showHitbox() {
		this.hitbox = true;
	}
}
