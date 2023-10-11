import { PlayerClass } from "./Player.js";
import { WallClass } from "./Wall.js";

export const world = {
	gravity: 0.25,
	entities: [new PlayerClass(220, 220, "blue")],
	walls: [
		new WallClass(390, 300, 50, 160, "red"),
		new WallClass(300, 140, 50, 200, "yellow"),
		new WallClass(100, 360, 80, 30, "green"),
		new WallClass(10, 230, 80, 30, "purple"),
	],
};
