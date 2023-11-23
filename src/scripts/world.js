import { PlayerClass } from "./classes/Player.js";
import { WallClass } from "./classes/Wall.js";

export const world = {
	gravity: 0.3,
	entities: [new PlayerClass(1, 3, 1, 1)],
	walls: [
		new WallClass(0, 10, 5, 2, "red"),
		new WallClass(11, 6, 5, 2, "yellow"),
		new WallClass(11, 12, 1, 5, "green"),
	],
};
