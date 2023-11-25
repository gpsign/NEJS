import { EntityClass } from "./Entity.js";

export class WallClass extends EntityClass {
	constructor(xTile, yTile, width, height, spriteIndex) {
		super(xTile, yTile, width, height, spriteIndex);
		this.updateSides();
		this.spriteChangeRate = 0;
		this.name = "wall";
	}
}
