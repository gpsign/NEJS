import { p, screen } from "../render.js";
import { keyMap } from "../keymap.js";
import { world } from "../world.js";
import { Sprites } from "../sprites.js";
import { EntityClass } from "./Entity.js";

export class PlayerClass extends EntityClass {
	vx = 0;
	vy = 0;
	vxCap = 100;
	vyCap = 10;
	walkingCap = 3;
	runningCap = 8;
	jumpHeight = -10;
	acceleration = 0.2;
	deacceleration = 0.25;
	width = 16;
	height = 16;
	top = this.x;
	right = this.x + this.width;
	bottom = this.y + this.height;
	left = this.y;
	onGround = false;
	renderStepCount = 0;
	spriteIndex = 0;
	spriteArray = [];
	spriteChangeRate = 3;

	constructor(x, y, color) {
		super(x, y, color);
	}
	deaccelerate() {
		if (this.vx > 0) this.sumVx(-this.deacceleration);
		else if (this.vx < 0) this.sumVx(this.deacceleration);
	}
	calculateMovement() {
		this.updateSides();

		keyMap["shift"]
			? (this.vxCap = this.runningCap)
			: (this.vxCap = this.walkingCap);

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
			if (this.checkTopCollision(wall)) {
				while (this.y + this.height < wall.top - 1) this.y++;
				this.vy = 0;
				this.onGround = true;
			} else if (this.checkBottomCollision(wall)) {
				while (this.y > wall.bottom + 2) this.y--;
				this.vy = 0;
			} else if (this.checkLeftCollision(wall)) {
				while (this.x + this.width < wall.left - 1) this.x++;
				this.vx = 0;
			} else if (this.checkRightCollision(wall)) {
				while (this.x > wall.right + 1) this.x--;
				this.vx = 0;
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
