import { world } from "../world.js";
import { EntityClass } from "./Entity.js";
import { goomba, p, screen, widthRatio } from "../render.js";

export class EnemyClass extends EntityClass {
	constructor(props) {
		const defaultProps = {
			vx: 1 * widthRatio,
			vyCap: 5,
			spriteChangeRate: 0,
			spriteIndex: 16,
		};

		const configProps = { ...defaultProps, ...props };

		super(configProps);

		const { vx, spriteIndex, spriteChangeRate, vyCap } = configProps;

		this.vx = vx;
		this.spriteIndex = spriteIndex;
		this.spriteChangeRate = spriteChangeRate;
		this.vyCap = vyCap;
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
	screenCollision() {
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
		this.screenCollision();

		this.x += this.vx;
		this.y += this.vy;
	}
}
