import { EnemyClass } from "./classes/Enemy.js";
import { PlayerClass } from "./classes/Player.js";
import { WallClass } from "./classes/Wall.js";

export const world = {
	gravity: 0.2,
	entities: [ 
		new PlayerClass(1, 8, 1, 1, 16),
		new EnemyClass(12, 4, 1, 1, 82),
		new EnemyClass(12, 13, 1, 1, 82),
	],
	walls: [
		new WallClass(0, 9, 5, 2, 68),
		new WallClass(11, 5, 5, 2, 68),
		new WallClass(11, 11, 1, 3, 66),
		new WallClass(0, 14, 17, 1, 66),
		new WallClass(2, 5, 1, 1, 24),
	],
};
