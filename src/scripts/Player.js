import { p, screen } from "./render.js";
import { keyMap } from "./keymap.js";

export class PlayerClass {
	vx = 0;
	vy = 0;
	vxCap = 4;
	vyCap = 10;
	jumpHeight = -10;
	acceleration = 0.2;
	deacceleration = 0.25;
	width = 64;
	height = 64;
	top = this.y;
	right = this.x + this.width;
	bottom = this.y + this.height;
	left = this.y;

	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
	}
	updateSides() {
		this.top = this.y;
		this.right = this.x + this.width;
		this.bottom = this.y + this.height;
		this.left = this.x;
	}
	sumVx(value) {
		this.vx += value;

		if (this.vx > this.vxCap) {
			this.vx = this.vxCap;
		}

		if (this.vx < -this.vxCap) {
			this.vx = -this.vxCap;
		}

		if ((this.vx < 0.1 && this.vx > 0) || (this.vx > -0.1 && this.vx < 0)) {
			this.vx = 0;
		}
	}
	sumVy(value) {
		this.vy += value;

		//limits vertical velocity
		if (this.vy > this.vyCap) this.vy = this.vyCap;
	}
	deaccelerate() {
		if (this.vx > 0) this.sumVx(-this.deacceleration);
		else if (this.vx < 0) this.sumVx(this.deacceleration);
	}
	render() {
		p.fillStyle = this.color;
		p.fillRect(this.x, this.y, this.width, this.height);
	}
	calculateMovement() {
		this.updateSides();

		keyMap["shift"] ? (this.vxCap = 8) : (this.vxCap = 4);

		//Gravity
		this.sumVy(0.25);

		//deaccelerates when not moving
		if (!keyMap["a"] && !keyMap["d"]) this.deaccelerate();

		//Jumps
		if ((keyMap["w"] || keyMap[" "]) && this.bottom === screen.height)
			this.sumVy(this.jumpHeight);

		let direction = 0;

		//Faces left
		if (keyMap["a"]) direction = -1;

		//Faces right
		if (keyMap["d"]) direction = 1;

		//Moves horizontally
		if (keyMap["a"] != keyMap["d"]) this.sumVx(this.acceleration * direction);

		//Cancel Movement
		if (keyMap["a"] && keyMap["d"]) this.deaccelerate();

		//Colides with ground
		if (this.bottom + this.vy > screen.height) {
			while (this.y + this.height < screen.height) this.y++;
			this.vy = 0;
		}

		//Colides with right wall
		if (this.right + this.vx > screen.width) {
			while (this.x + this.width < screen.width - 1) this.x++;
			this.vx = 0;
		}

		//Colides with left wall
		if (this.left + this.vx > screen.width || this.x + this.vx < 0) {
			while (this.x > 1) this.x--;
			this.vx = 0;
		}

		this.x += this.vx;
		this.y += this.vy;
	}
}
