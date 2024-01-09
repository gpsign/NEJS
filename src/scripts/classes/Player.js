import { keyMap } from "../keymap.js";
import { heightRatio, widthRatio } from "../render.js";
import { world } from "../world.js";
import { EntityClass } from "./Entity.js";

export class PlayerClass extends EntityClass {
	constructor(props) {
		const defaultProps = {
			name: "Player",
			walkingCap: 50 * 625,
			runningCap: 100 * 625,
			jumpHeight: 100 * 1250,
			acceleration: 625,
			deceleration: 625,
			spriteChangeRate: 0,
		};
		const configProps = { ...defaultProps, ...props };

		super(configProps);

		const {
			walkingCap,
			runningCap,
			jumpHeight,
			acceleration,
			deceleration,
			spriteChangeRate,
		} = configProps;

		this.walkingCap = walkingCap;
		this.runningCap = runningCap;
		this.jumpHeight = jumpHeight;
		this.acceleration = acceleration;
		this.deceleration = deceleration;
		this.spriteChangeRate = spriteChangeRate;
	}
	decelerate() {
		//Decelerates the player's velocity.
		if (this.vx > 0) {
			if (this.vx - this.deceleration <= 0) this.vx = 0;
			else this.sumVx(-this.deceleration);
		} else if (this.vx < 0) {
			if (this.vx + this.deceleration >= 0) this.vx = 0;
			else this.sumVx(this.deceleration);
		}
	}
	wallCollision() {
		let horizontalCollision = false;
		let verticalCollision = false;

		world.group("walls").forEach((wall) => {
			if (this.checkBottomCollision(wall)) {
				this.y = wall.y - this.height;
				this.vy = 0;
				this.onGround = true;
				verticalCollision = true;
				this.vertical = true;

				return;
			} else if (this.checkTopCollision(wall)) {
				this.y++;

				this.vy = 0;
				verticalCollision = true;
				this.vertical = true;

				return;
			}

			if (this.checkLeftCollision(wall)) {
				this.x++;

				this.vx = 0;
				horizontalCollision = true;
				this.horizontal = true;

				return;
			}
			if (this.checkRightCollision(wall)) {
				this.x--;

				this.vx = 0;
				horizontalCollision = true;
				this.horizontal = true;

				return;
			}
		});

		if (!verticalCollision) this.vertical = false;
		if (!horizontalCollision) this.horizontal = false;
	}
	entityCollision() {
		const entities = world.group("entities");
		for (let i = 0; i < entities.length; i++) {
			if (world.entities[i] != undefined && entities[i] != this) {
				const collided = this.checkCollision(entities[i]);

				if (collided)
					if (collided === "top") {
						this.vy = -3;
						delete world.entities[i];
					} else {
						location.reload();
					}
			}
		}
	}
	calculateMovement() {
		this.update();

		keyMap["shift"]
			? (this.vxCap = this.runningCap)
			: (this.vxCap = this.walkingCap);

		//Gravity
		this.sumVy(world.gravity * heightRatio);

		//decelerates when not moving
		if (!keyMap["a"] && !keyMap["d"]) this.decelerate();

		this.screenCollision();

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
		if (keyMap["a"] && keyMap["d"]) this.decelerate();

		this.x += this.transformCoordinates(this.vx);
		this.y += this.transformCoordinates(this.vy);

		this.update();
	}
}
