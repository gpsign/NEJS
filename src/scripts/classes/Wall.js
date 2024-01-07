import { EntityClass } from "./Entity.js";

export class WallClass extends EntityClass {
  constructor(
    xTile,
    yTile,
    width,
    height,
    spriteIndex,
    name = "wall",
    debug = []
  ) {
    super(xTile, yTile, width, height, spriteIndex, name, "walls", debug);
    this.updateSides();
    this.spriteChangeRate = 0;
    this.name = name;
  }
}
