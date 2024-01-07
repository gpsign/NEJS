import { heightRatio, p as canvasPainter, widthRatio } from "../render.js";
import { contains } from "../utils.js";

export default class AreaClass {
  constructor(
    x,
    y,
    width,
    height,
    widthScale = widthRatio,
    heightScale = heightRatio
  ) {
    this.x = x * widthScale;
    this.y = y * heightScale;
    this.width = width * widthScale;
    this.height = height * heightScale;

    this.xWidth = this.x + this.width;
    this.yHeight = this.y + this.height;

    this.data = [this.x, this.y, this.width, this.height];

    this.topLeft = [this.x, this.y];
    this.topRight = [this.x + this.width, this.y];
    this.bottomLeft = [this.x, this.y + this.height];
    this.bottomRight = [this.x + this.width, this.y + this.height];

    this.points = [
      this.topLeft,
      this.topRight,
      this.bottomLeft,
      this.bottomRight,
    ];
  }
  update() {
    this.topLeft = [this.x, this.y];
    this.topRight = [this.xWidth, this.y];
    this.bottomLeft = [this.x, this.y];
    this.bottomRight = [this.xWidth, this.yHeight];

    this.data = [this.x, this.y, this.width, this.height];

    this.xWidth = this.x + this.width;
    this.yHeight = this.y + this.height;

    this.points = [
      this.topLeft,
      this.topRight,
      this.bottomLeft,
      this.bottomRight,
    ];
  }
  isPointInside(point) {
    const [pointX, pointY] = point;

    return (
      contains(pointX, this.x, this.xWidth) &&
      contains(pointY, this.y, this.yHeight)
    );
  }
  isInsideArea(area) {
    for (const point of this.points) if (area.isPointInside(point)) return true;

    return false;
  }
  isInsideAreaTop(area) {
    const topArea = new AreaClass(
      area.x,
      area.y,
      area.width,
      area.height / 2,
      1,
      1
    );

    return this.isInsideArea(topArea);
  }
  isInsideAreaRight(area) {
    const rightArea = new AreaClass(
      area.x + area.width / 2,
      area.y,
      area.width / 2,
      area.height,
      1,
      1
    );

    //console.log(area.points, rightArea.points);

    rightArea.showHitbox();

    return this.isInsideArea(rightArea);
  }
  showHitbox(color = "rgba(255, 0, 0, 0.5)") {
    canvasPainter.fillStyle = color;
    canvasPainter.fillRect(this.x, this.y, this.width, this.height);
  }
}
