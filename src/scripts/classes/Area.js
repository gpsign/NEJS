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

		this.defaultHitboxColor = "rgba(255, 0, 0, 0.5)";
		this.hitboxColor = this.defaultHitboxColor;
		this.contactHitboxColor = this.defaultHitboxColor;

		if (!child) {
			this.rightArea = new AreaClass(
				this.x + this.width / 2,
				this.y,
				this.width / 2,
				this.height,
				1,
				1,
				true
			);
			this.topArea = new AreaClass(
				this.x,
				this.y,
				this.width,
				this.height / 2,
				1,
				1,
				true
			);
			this.leftArea = new AreaClass(
				this.x,
				this.y,
				this.width / 2,
				this.height,
				1,
				1,
				true
			);
			this.bottomArea = new AreaClass(
				this.x,
				this.y + this.height / 2,
				this.width,
				this.height / 2,
				1,
				1,
				true
			);
		}
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
			right.update();

			const left = this.leftArea;
			left.x = this.x;
			left.y = this.y;
			left.update();

			const top = this.topArea;
			top.x = this.x;
			top.y = this.y;
			top.height = this.height / 2;
			top.update();

			const bottom = this.bottomArea;
			bottom.x = this.x;
			bottom.y = this.y + this.height / 2;
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
		return this.isInsideArea(topArea);
	}
	isInsideAreaRight(area) {
		const result = this.isInsideArea(area.rightArea);

		if (result) this.setHitboxColor(this.contactHitboxColor);
		else this.setHitboxColor();

		return result;
	}
	renderHitbox() {
		if (this.hitbox && this.clock != world.clock) {
			this.clock = world.clock;
			canvasPainter.fillStyle = this.hitboxColor;
			canvasPainter.fillRect(this.x, this.y, this.width, this.height);
		}

		if (!this.child) {
			this.rightArea.renderHitbox();
			this.leftArea.renderHitbox();
			this.topArea.renderHitbox();
			this.bottomArea.renderHitbox();
		}
	}
	showHitbox() {
		this.hitbox = true;
	}
	setContactHitboxColor(color = undefined) {
		if (color) this.contactHitboxColor = color;
		else this.contactHitboxColor = this.defaultHitboxColor;
	}
	setHitboxColor(color = undefined) {
		if (color) this.hitboxColor = color;
		else this.hitboxColor = this.defaultHitboxColor;
	}
}
