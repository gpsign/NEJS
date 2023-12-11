import { world } from "../world.js";
import { EntityClass } from "./Entity.js";
import { goomba, p, screen, widthRatio } from "../render.js";

export class EnemyClass extends EntityClass {
	constructor(xTile, yTile, width, height, spriteIndex, name = "") {
		super(xTile, yTile, width, height);
		this.vx = 1 * widthRatio;
		this.vy = 0;
		this.spriteIndex = spriteIndex;
		this.spriteChangeRate = 0;
		this.vyCap = 5;
		this.name = name;
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
				this.vx = -this.vx;
			} else if (this.checkRightCollision(wall)) {
				while (this.x > wall.right + 1) this.x--;
				this.vx = -this.vx;
			}
		});
	}
	screenColission() {
		//Collides with ground
		if (this.futureBottom > screen.height) {
			while (this.y + this.height < screen.height) this.y++;
			this.vy = 0;
		}

		//Collides with right wall
		if (this.futureRight > screen.width) {
			while (this.x + this.width + this.vx < screen.width - 1) this.x++;
			this.vx = -this.vx;
		}

		//Collides with left wall
		if (this.futureLeft > screen.width || this.x + this.vx < 0) {
			while (this.x > 1) this.x--;
			this.vx = -this.vx;
		}
	}
	calculateMovement() {
		this.newSprite = goomba;
		this.updateSides();
		this.sumVy(world.gravity);

		this.wallCollision();
		this.screenColission();

		this.x += this.vx;
		this.y += this.vy;
	}
}
