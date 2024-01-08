import {
  heightRatio,
  p as canvasPainter,
  screen,
  widthRatio,
} from "../render.js";
import { Sprites } from "../sprites.js";
import { contains, isValid, lineOverlaps } from "../utils.js";
import { logObject } from "../log.js";
import AreaClass from "./Area.js";
import { world } from "../world.js";

export class EntityClass extends AreaClass {
  spriteArray = [];
  onGround = false;
  renderStepCount = 0;
  stepVx = 0;

  constructor(props) {
    const defaultProps = {
      xTile: 0,
      yTile: 0,
      width: 0,
      height: 0,
      spriteIndex: 0,
      name: `entity ${world.entities?.length + 1}`,
      group: "entities",
      debug: [],
      vx: 0,
      vy: 0,
      layer: 0,
    };

    const configProps = { ...defaultProps, ...props };

    const {
      xTile,
      yTile,
      width,
      height,
      vy,
      vx,
      spriteIndex,
      name,
      debug,
      group,
      layer,
    } = configProps;

    super(
      Sprites.tileSize * xTile,
      Sprites.tileSize * yTile,
      Sprites.tileSize * width,
      Sprites.tileSize * height
    );

    this.vy = vy;
    this.vx = vx;

    this.spriteIndex = spriteIndex;
    this.name = name;
    this.debug = debug;

    if (!world[group]) world[group] = [];
    world[group].push(this);

    if (!world.layers[layer]) world.layers[layer] = [];
    world.layers[layer].push(this);
  }
  log() {
    if (this.debug.length != 0) logObject(this, this.debug);
  }
  transformCoordinates(coordinate) {
    return Math.floor(coordinate / 10000);
  }
  updateSprite() {
    if (this.spriteArray.length === 0) this.spriteArray = Sprites.array;
  }
  sumVx(value) {
    this.vx += value * widthRatio;

    if (this.vx > this.vxCap) this.vx = this.vxCap;

    if (this.vx < -this.vxCap) this.vx = -this.vxCap;
  }
  sumVy(value) {
    this.vy += value;

    //limits vertical velocity
    if (this.vy > this.vyCap) this.vy = this.vyCap;

    this.vy = Math.round((this.vy + Number.EPSILON) * 100) / 100;
  }
  entityCollision() {}
  wallCollision() {}
  calculateCollision() {
    this.wallCollision();
    this.entityCollision();
  }
  changeSprite() {
    this.updateSprite();
    if (this.spriteChangeRate === 0)
      return (this.sprite = this.spriteArray[this.spriteIndex]);

    //Checks for a full sprite step
    if (this.renderStepCount >= 60 / this.spriteChangeRate) {
      this.renderStepCount = 0;
      this.spriteIndex++;
      if (this.spriteIndex >= this.spriteArray.length) this.spriteIndex = 0;
      this.sprite = this.spriteArray[this.spriteIndex];
    }
  }
  render() {
    //Sprite logic
    this.changeSprite();
    this.update();

    //StepCount for changing sprite
    this.renderStepCount++;

    //Render

    if (!isValid(this.newSprite))
      for (let i = 0; i < this.height; i += Sprites.tileSize * heightRatio)
        for (let j = 0; j < this.width; j += Sprites.tileSize * widthRatio) {
          // canvasPainter.clearRect(
          //   this.x,
          //   this.y,
          //   this.sprite.width * widthRatio,
          //   this.sprite.height * heightRatio
          // );
          canvasPainter.drawImage(
            this.sprite,
            this.x + j,
            this.y + i,
            this.sprite.width * widthRatio,
            this.sprite.height * heightRatio
          );
        }
    else {
      this.newSprite.x = this.x;
      this.newSprite.y = this.y;
      this.newSprite.positionTiles();
      //this.newSprite.render();
    }
  }
  screenCollision() {
    //Collides with ground
    if (this.yHeight >= screen.height) {
      this.onGround = true;
      this.y = screen.height - this.height;
      this.vy = 0;
    }

    //Collides with left wall
    if (this.left < 0) {
      this.x = 0;
      this.vx = 0;
    }

    //Collides with right wall
    if (this.right >= screen.width) {
      this.x = screen.width - this.width;
      this.vx = 0;
    }
  }
  checkCollision(other) {
    if (this.checkTopCollision(other)) return "top";
    if (this.checkRightCollision(other)) return "right";
    if (this.checkLeftCollision(other)) return "left";
    if (this.checkBottomCollision(other)) return "bottom";
  }
  checkSidesCollision(other) {
    if (this.checkRightCollision(other) || this.checkLeftCollision(other))
      return true;
    return false;
  }
  checkTopAndDownCollision(other) {
    if (this.checkTopCollision(other) || this.checkBottomCollision(other))
      return true;
    return false;
  }
  checkTopCollision(other) {
    if (this.isInsideArea(other)) {
      if (contains(this.yHeight, other.y, other.y + other.width / 2))
        return true;
      return false;
    }
    return false;
  }
  checkRightCollision(other) {
    //Check if its is on the right side of the other
    if (lineOverlaps(this.heightLine, other.heightLine)) {
      //Check for collision
      if (contains(this.left, other.left, other.right)) {
        return true;
      }

      return false;
    }
  }
  checkBottomCollision(other) {
    //Check if its is below the other
    if (lineOverlaps(this.widthLine, other.widthLine)) {
      //Check for collision
      if (contains(this.top, other.top + 1, other.bottom)) return true;

      return false;
    }
  }
  checkLeftCollision(other) {
    //Check if its is on the left side of the other
    if (lineOverlaps(this.heightLine, other.heightLine)) {
      //Check for collision
      if (contains(this.right, other.left, other.right)) return true;

      return false;
    }
  }
}
