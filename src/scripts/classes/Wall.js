import { EntityClass } from "./Entity.js";

export class WallClass extends EntityClass {
  constructor(props) {
    const defaultProps = {
      group: "walls",
      name: "wall",
      spriteChangeRate: 0,
    };
    const configProps = { ...defaultProps, ...props };

    super(configProps);

    const { name, spriteChangeRate } = configProps;

    this.update();
    this.spriteChangeRate = 0;
    this.name = name;
  }
}
