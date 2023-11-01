import { p, screen } from "./render.js";
import { keyMap } from "./keymap.js";
import { world } from "./world.js";

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
	top = this.x;
	right = this.x + this.width;
	bottom = this.y + this.height;
	left = this.y;
	onGround = false;

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

		//Fix sliding
		if ((this.vx < 0.2 && this.vx > 0) || (this.vx > -0.2 && this.vx < 0)) {
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
		this.sumVy(world.gravity);

		//deaccelerates when not moving
		if (!keyMap["a"] && !keyMap["d"]) this.deaccelerate();

		//Jumps
		if ((keyMap["w"] || keyMap[" "]) && this.onGround) {
			this.onGround = false;
			this.sumVy(this.jumpHeight);
		}

		let direction = 0;

		//Faces left
		if (keyMap["a"]) direction = -1;

		//Faces right
		if (keyMap["d"]) direction = 1;

		//Moves horizontally
		if (keyMap["a"] != keyMap["d"]) this.sumVx(this.acceleration * direction);

		//Cancel Movement
		if (keyMap["a"] && keyMap["d"]) this.deaccelerate();

		//Check for wall collisions
		world.walls.forEach((wall) => {
			const fRight = this.right + this.vx;
			const fLeft = this.left + this.vx;
			const fBottom = this.bottom + this.vy;
			const fTop = this.top + this.vy;

			let onTop = false;

			//Check if it is above the wall
			if (
				((fRight >= wall.left && fRight <= wall.right) ||
					(fLeft >= wall.left && fLeft <= wall.right) ||
					(fLeft <= wall.left && fRight >= wall.right) ||
					(this.left <= wall.left && this.right >= wall.right)) &&
				fBottom <= wall.top + this.vy
			) {
				//Check for collision
				if (fBottom >= wall.top && fBottom <= wall.bottom) {
					while (this.y + this.height < wall.top - 1) this.y++;
					this.vy = 0;
					this.onGround = true;
				}
			}

			//Check if its is below the wall
			if (
				((fRight >= wall.left && fRight <= wall.right) ||
					(fLeft >= wall.left && fLeft <= wall.right) ||
					(fLeft <= wall.left && fRight >= wall.right) ||
					(this.left <= wall.left && this.right >= wall.right)) &&
				fTop >= wall.bottom + this.vy
			) {
				//Check for collision
				if (fTop <= wall.bottom + 1 && fTop >= wall.top) {
					while (this.y > wall.bottom + 2) this.y--;
					this.vy = 0;
				}
			}

			//Check if its is on the left side of the wall
			if (
				((fTop >= wall.top && fTop <= wall.bottom) ||
					(fTop <= wall.top && fBottom >= wall.bottom) ||
					(fBottom >= wall.top && fBottom <= wall.bottom)) &&
				fRight < wall.left + this.vx
			) {
				//Check for collison
				if (fRight <= wall.right && fRight >= wall.left) {
					while (this.x + this.width < wall.left - 1) this.x++;
					this.vx = 0;
				}
			}

			//Check if its is on the right side of the wall
			if (
				((fTop >= wall.top && fTop <= wall.bottom) ||
					(fTop <= wall.top && fBottom >= wall.bottom) ||
					(fBottom >= wall.top && fBottom <= wall.bottom) ||
					(this.top <= wall.top && this.bottom >= wall.bottom)) &&
				fLeft > wall.right + this.vx
			) {
				//Check for collison
				if (fLeft <= wall.right && fLeft >= wall.left) {
					while (this.x > wall.right + 1) this.x--;
					this.vx = 0;
				}
			}
		});

		//Collides with ground
		if (this.bottom + this.vy > screen.height) {
			this.onGround = true;
			while (this.y + this.height < screen.height) this.y++;
			this.vy = 0;
		}

		//Collides with right wall
		if (this.right + this.vx > screen.width) {
			while (this.x + this.width < screen.width - 1) this.x++;
			this.vx = 0;
		}

		//Collides with left wall
		if (this.left + this.vx > screen.width || this.x + this.vx < 0) {
			while (this.x > 1) this.x--;
			this.vx = 0;
		}

		this.x += this.vx;
		this.y += this.vy;
	}
}
