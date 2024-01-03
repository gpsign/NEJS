import { EnemyClass } from "./classes/Enemy.js";
import { PlayerClass } from "./classes/Player.js";
import { WallClass } from "./classes/Wall.js";

export const world = {
	gravity: 0.2,
	entities: [
		new PlayerClass(12, 7, 1, 1, 16, "player", ["left", "right", "bottom"]),
		//new EnemyClass(12, 12, 1, 1, 82, "enemy-1", ["left", "right"]),
	],
	walls: [
		//new WallClass(5, 8, 6, 2, 68),
		//new WallClass(0, 10, 1, 3, 68),
		//new WallClass(0, 10, 1, 3, 68),
		//new WallClass(0, 14, 10, 2, 66, "chão-left", ["top", "right"]),
		//new WallClass(14, 14, 1, 2, 66, "chão-dir", ["top", "right"]),
		//new WallClass(4, 8, 1, 1, 24),
	],
};

new EnemyClass(12, 3.5, 1, 1, 82);
