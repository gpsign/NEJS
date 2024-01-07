import { heightRatio, widthRatio } from "../render.js";
import { Sprites } from "../sprites.js";
import { unfold, isValid, scaleMatrice as scaleMatrize } from "../utils.js";
import AreaClass from "./Area.js";

export default class TileClass extends AreaClass {
  constructor(canvasPainter, CHR, palette, xPosition = 0, yPosition = 0) {
    super(
      xPosition * Sprites.size,
      yPosition * Sprites.size,
      Sprites.size,
      Sprites.size
    );

    this.sprite = canvasPainter.createImageData(this.width, this.height);
    this.palette = palette;
    this.canvasPainter = canvasPainter;
    this.CHR = CHR;
    this.scaledCHR = scaleMatrize(CHR, widthRatio, heightRatio);

    const dataCanvas = this.sprite.data;

    const unfoldedData = unfold(this.scaledCHR);

    let bitCounter = 0;

    for (let i = 0; i < unfoldedData.length; i++) {
      for (let j = 0; j < widthRatio; j++) {
        const pData = unfoldedData[i];
        const color = palette.data[pData];

        dataCanvas[bitCounter] = color.r;
        dataCanvas[bitCounter + 1] = color.g;
        dataCanvas[bitCounter + 2] = color.b;
        dataCanvas[bitCounter + 3] = color.a;

        bitCounter += 4;
      }
    }

    this.sprite.data.set(dataCanvas);
  }
  render() {
    if (isValid(this.x, this.y))
      this.canvasPainter.putImageData(this.sprite, this.x, this.y);
  }
  mirror() {
    const aux = this.sprite.data;

    const mirrorData = this.scaledCHR.map((line) => line.reverse());
    const unfoldedData = unfold(mirrorData);

    let bitCounter = 0;

    for (let i = 0; i < unfoldedData.length; i++) {
      for (let j = 0; j < widthRatio; j++) {
        const pData = unfoldedData[i];
        const color = this.palette.data[pData];

        aux[bitCounter] = color.r;
        aux[bitCounter + 1] = color.g;
        aux[bitCounter + 2] = color.b;
        aux[bitCounter + 3] = color.a;
        bitCounter += 4;
      }
    }

    this.sprite.data.set(aux);
  }
  clone() {
    return new TileClass(
      this.canvasPainter,
      this.CHR,
      this.palette,
      this.x,
      this.y
    );
  }
}
