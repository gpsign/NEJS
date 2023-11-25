import { world } from "./world.js";
import { screen } from "./render.js";

let cameraX = 0;

export class Camera {
	constructor() {
		this.x = 0;
		this.moveEntities = false;
	}
	calculateX() {
		const player = world.entities[0];
		if (!player) return;
		if (player.x > (screen.width + this.x) / 2 && player.vx > 0) {
			player.x -= player.vx / 60;
			console.log(player.x);
			this.x += player.vx / 60;
			this.moveEntities = true;
		} else this.moveEntities = false;
	}
}
