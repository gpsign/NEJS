import { p, screen } from "../render.js";
import { keyMap } from "../keymap.js";
import { world } from "../world.js";
import { Sprites } from "../sprites.js";

export class EntityClass {
	vx = 0;
	vy = 0;
	vxCap = 100;
	vyCap = 10;
	top = this.x;
	right = this.x + this.width;
	bottom = this.y + this.height;
	left = this.y;
	onGround = false;
	renderStepCount = 0;
	spriteIndex = 0;
	spriteArray = [];
	spriteChangeRate = 3;

	constructor(xTile, yTile, width, height) {
		this.x = 16 * xTile;
		this.y = 16 * yTile;
		this.width = 16 * width;
		this.height = 16 * height;
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
		p.drawImage(this.sprite, this.x, this.y);
	}
	checkColission(other) {}
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
			if (this.futureBottom >= other.top && this.futureBottom <= other.bottom)
				return true;
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
