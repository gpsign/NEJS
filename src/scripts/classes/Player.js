import { keyMap } from "../keymap.js";
import { heightRatio, widthRatio } from "../render.js";
import { world } from "../world.js";
import { EntityClass } from "./Entity.js";

export class PlayerClass extends EntityClass {
	constructor(xTile, yTile, width, height, spriteIndex) {
		super(xTile, yTile, width, height, spriteIndex);
		this.vx = 0;
		this.vy = 0;
		this.walkingCap = 1 * widthRatio;
		this.runningCap = 4 * widthRatio;
		this.jumpHeight = 6 * heightRatio;
		this.acceleration = 0.15 * widthRatio;
		this.deacceleration = 0.25 * widthRatio;
		this.spriteChangeRate = 0;
		this.name = "player";
	}
	deaccelerate() {
		if (this.vx > 0) this.sumVx(-this.deacceleration);
		else if (this.vx < 0) this.sumVx(this.deacceleration);
	}
	wallCollision() {
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
	}
	calculateMovement() {
		this.updateSides();

		keyMap["shift"]
			? (this.vxCap = this.runningCap)
			: (this.vxCap = this.walkingCap);

		//Gravity
		this.sumVy(world.gravity * heightRatio);

		//deaccelerates when not moving
		if (!keyMap["a"] && !keyMap["d"]) this.deaccelerate();

		this.screenColission();

		//Jumps
		if ((keyMap["w"] || keyMap[" "]) && this.onGround) {
			this.onGround = false;
			this.sumVy(-this.jumpHeight);
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

		//Check for collisions
		this.wallCollision();

		for (let i = 0; i < world.entities.length; i++) {
			if (world.entities[i] != undefined && world.entities[i] != this) {
				const collided = this.checkCollission(world.entities[i]);

				if (collided)
					if (collided === "top") {
						this.vy = -3;
						delete world.entities[i];
					} else {
						location.reload();
					}
			}
		}

		this.x += Math.round(this.vx);
		this.y += Math.round(this.vy);
	}
}
