import { heightRatio, p, screen, widthRatio } from "../render.js";
import { Sprites } from "../sprites.js";
import { contains, isValid, lineOverlaps } from "../utils.js";
import { logObject } from "../log.js";

export class EntityClass {
	spriteArray = [];

	constructor(xTile, yTile, width, height, spriteIndex, name = "", debug = []) {
		this.x = Sprites.tileSize * xTile * widthRatio;
		this.y = Sprites.tileSize * yTile * heightRatio;
		this.width = Sprites.tileSize * width * widthRatio;
		this.height = Sprites.tileSize * height * heightRatio;
		this.vy = 0;
		this.vx = 0;
		this.onGround = false;
		this.renderStepCount = 0;
		this.spriteIndex = spriteIndex;
		this.name = name;
		this.stepVx = 0;
		this.debug = debug;
	}
	log() {
		if (this.debug.length != 0) logObject(this, this.debug);
	}
	transformCoordinates(coordinate) {
		return Math.floor(coordinate / 10000);
	}
	updateSprite() {
		if (this.spriteArray.length === 0) this.spriteArray = Sprites.array;
	}
	updateSides() {
		this.top = this.y;
		this.right = this.x + this.width;
		this.bottom = this.y + this.height;
		this.left = this.x;

		this.FR = this.right + this.transformCoordinates(this.vx);
		this.FL = this.left + this.transformCoordinates(this.vx);
		this.FB = this.bottom + this.vy;
		this.FT = this.top + this.vy;

		this.widthLine = [this.FL, this.FR];
		this.heightLine = [this.FT, this.FB];
	}
	sumVx(value) {
		this.vx += value * widthRatio;

		if (this.vx > this.vxCap) this.vx = this.vxCap;

		if (this.vx < -this.vxCap) this.vx = -this.vxCap;
	}
	sumVy(value) {
		this.vy += value;

		//limits vertical velocity
		if (this.vy > this.vyCap) this.vy = this.vyCap;

		this.vy = Math.round((this.vy + Number.EPSILON) * 100) / 100;
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
	render() {
		//Sprite logic
		this.changeSprite();
		this.updateSides();

		//StepCount for changing sprite
		this.renderStepCount++;

		//Render

		if (!isValid(this.newSprite))
			for (let i = 0; i < this.height; i += Sprites.tileSize * heightRatio)
				for (let j = 0; j < this.width; j += Sprites.tileSize * widthRatio)
					p.drawImage(
						this.sprite,
						this.x + j,
						this.y + i,
						this.sprite.width * widthRatio,
						this.sprite.height * heightRatio
					);
		else {
			this.newSprite.xPosition = this.x;
			this.newSprite.yPosition = this.y;
			this.newSprite.positionTiles();
			this.newSprite.render();
		}
	}
	screenCollision() {
		//Collides with ground
		if (this.FB > screen.height) {
			this.onGround = true;
			this.y = screen.height - this.height;
			this.vy = 0;
		}

		//Collides with left wall
		if (this.FL > screen.width || this.FR < 0) {
			this.x = 0;
			this.vx = 0;
		}

		//Collides with right wall
		if (this.FR > screen.width) {
			this.x = screen.width - this.width;
			this.vx = 0;
		}
	}
	checkCollission(other) {
		if (this.checkTopCollision(other)) return "top";
		if (this.checkRightCollision(other)) return "right";
		if (this.checkLeftCollision(other)) return "left";
		if (this.checkBottomCollision(other)) return "bottom";
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
			lineOverlaps(this.widthLine, other.widthLine) &&
			this.FB - this.vy <= other.FT
		) {
			//Check for collision
			if (contains(this.FB, other.FT, other.FB)) {
				return true;
			}
			return false;
		}
	}
	checkRightCollision(other) {
		//Check if its is on the right side of the other
		if (
			lineOverlaps(this.heightLine, other.heightLine) &&
			this.FL >= other.FR + this.transformCoordinates(this.vx)
		) {
			//Check for collison
			if (contains(this.FL, other.FL, other.FR)) return true;

			return false;
		}
	}
	checkBottomCollision(other) {
		//Check if its is below the other
		if (
			lineOverlaps(this.widthLine, other.widthLine) &&
			this.FT >= other.FB + this.vy
		) {
			//Check for collision
			if (contains(this.FT, other.FT + 1, other.FB)) return true;

			return false;
		}
	}
	checkLeftCollision(other) {
		//Check if its is on the left side of the other
		if (
			lineOverlaps(this.heightLine, other.heightLine) &&
			this.FR <= other.FL + this.transformCoordinates(this.vx)
		) {
			//Check for collison
			if (contains(this.FR, other.FL, other.FR)) return true;

			return false;
		}
	}
}
