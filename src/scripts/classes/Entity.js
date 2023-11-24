import { p, screen } from "../render.js";
import { Sprites } from "../sprites.js";

export class EntityClass {
	spriteArray = [];

	constructor(xTile, yTile, width, height, spriteIndex) {
		this.x = Sprites.size * xTile;
		this.y = Sprites.size * yTile;
		this.width = Sprites.size * width;
		this.height = Sprites.size * height;
		this.vy = 0;
		this.vx = 0;
		this.onGround = false;
		this.renderStepCount = 0;
		this.spriteIndex = spriteIndex;
	}
	updateSprite() {
		if (this.spriteArray.length === 0) this.spriteArray = Sprites.array;
	}
	updateSides() {
		this.top = this.y;
		this.right = this.x + this.width;
		this.bottom = this.y + this.height;
		this.left = this.x;

		this.futureRight = this.right + this.vx;
		this.futureLeft = this.left + this.vx;
		this.futureBottom = this.bottom + this.vy;
		this.futureTop = this.top + this.vy;
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
	changeSprite() {
		this.updateSprite();
		if (this.spriteChangeRate === 0)
			return (this.sprite = this.spriteArray[this.spriteIndex]);

		//Checks for a full sprite step
		if (this.renderStepCount >= 60 / this.spriteChangeRate) {
			this.renderStepCount = 0;
			this.spriteIndex++;
			if (this.spriteIndex >= this.spriteArray.length) this.spriteIndex = 0;
			this.sprite = this.spriteArray[this.spriteIndex];
		}
	}
	async render() {
		//Sprite logic
		this.changeSprite();

		

		//StepCount for changing sprite
		this.renderStepCount++;

		//Render
		for (let i = 0; i < this.height; i += Sprites.size)
			for (let j = 0; j < this.width; j += Sprites.size)
				p.drawImage(this.sprite, this.x + j, this.y + i);
	}
	screenColission() {
		//Collides with ground
		if (this.futureBottom > screen.height) {
			this.onGround = true;
			while (this.y + this.height < screen.height) this.y++;
			this.vy = 0;
		}

		//Collides with right wall
		if (this.futureRight > screen.width) {
			while (this.x + this.width < screen.width - 1) this.x++;
			this.vx = 0;
		}

		//Collides with left wall
		if (this.futureLeft > screen.width || this.x + this.vx < 0) {
			while (this.x > 1) this.x--;
			this.vx = 0;
		}
	}
	checkCollission(other) {
		if (
			this.checkTopCollision(other) ||
			this.checkRightCollision(other) ||
			this.checkBottomCollision(other) ||
			this.checkLeftCollision(other)
		)
			return true;
		return false;
	}
	checkSidesCollision(other) {
		if (this.checkRightCollision(other) || this.checkLeftCollision(other))
			return true;
		return false;
	}
	checkTopAndDownCollision(other) {
		if (this.checkTopCollision(other) || this.checkBottomCollision(other))
			return true;
		return false;
	}
	checkTopCollision(other) {
		//Check if it is above the other
		if (
			((this.futureRight >= other.left && this.futureRight <= other.right) ||
				(this.futureLeft >= other.left && this.futureLeft <= other.right) ||
				(this.futureLeft <= other.left && this.futureRight >= other.right) ||
				(this.left <= other.left && this.right >= other.right)) &&
			this.futureBottom <= other.top + this.vy
		) {
			//Check for collision
			if (this.futureBottom >= other.top && this.futureBottom <= other.bottom) {
				return true;
			}
			return false;
		}
	}
	checkRightCollision(other) {
		//Check if its is on the right side of the other
		if (
			((this.futureTop >= other.top && this.futureTop <= other.bottom) ||
				(this.futureTop <= other.top && this.futureBottom >= other.bottom) ||
				(this.futureBottom >= other.top && this.futureBottom <= other.bottom) ||
				(this.top <= other.top && this.bottom >= other.bottom)) &&
			this.futureLeft > other.right + this.vx
		) {
			//Check for collison
			if (this.futureLeft <= other.right && this.futureLeft >= other.left)
				return true;
			return false;
		}
	}
	checkBottomCollision(other) {
		//Check if its is below the other
		if (
			((this.futureRight >= other.left && this.futureRight <= other.right) ||
				(this.futureLeft >= other.left && this.futureLeft <= other.right) ||
				(this.futureLeft <= other.left && this.futureRight >= other.right) ||
				(this.left <= other.left && this.right >= other.right)) &&
			this.futureTop >= other.bottom + this.vy
		) {
			//Check for collision
			if (this.futureTop <= other.bottom + 1 && this.futureTop >= other.top)
				return true;
			return false;
		}
	}
	checkLeftCollision(other) {
		//Check if its is on the left side of the other
		if (
			((this.futureTop >= other.top && this.futureTop <= other.bottom) ||
				(this.futureTop <= other.top && this.futureBottom >= other.bottom) ||
				(this.futureBottom >= other.top &&
					this.futureBottom <= other.bottom)) &&
			this.futureRight < other.left + this.vx
		) {
			//Check for collison
			if (this.futureRight <= other.right && this.futureRight >= other.left)
				return true;
			return false;
		}
	}
}
