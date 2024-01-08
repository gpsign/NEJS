import TileClass from "../classes/Tile.js";

const goomba_top = [
  [0, 0, 0, 0, 0, 0, 2, 2],
  [0, 0, 0, 0, 0, 2, 2, 2],
  [0, 0, 0, 0, 2, 2, 2, 2],
  [0, 0, 0, 2, 2, 2, 2, 2],
  [0, 0, 2, 3, 3, 2, 2, 2],
  [0, 2, 2, 2, 1, 3, 2, 2],
  [0, 2, 2, 2, 1, 3, 2, 2],
  [2, 2, 2, 2, 1, 3, 1, 2],
];

const goomba_bottom = [
  [2, 2, 2, 2, 1, 1, 1, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
  [0, 2, 2, 2, 2, 1, 1, 1],
  [0, 0, 0, 0, 1, 1, 1, 1],
  [0, 0, 3, 3, 1, 1, 1, 1],
  [0, 3, 3, 3, 3, 3, 1, 1],
  [0, 3, 3, 3, 3, 3, 3, 0],
  [0, 0, 3, 3, 3, 3, 3, 0],
];

function goombaSprite(p, pallete) {
  const goomba_top_mirror = new TileClass(p, goomba_top, pallete);
  goomba_top_mirror.mirror();

  const goomba_bottom_mirror = new TileClass(p, goomba_bottom, pallete);
  goomba_bottom_mirror.mirror();

  return [
    new TileClass(p, goomba_top, pallete, 5, 5),
    goomba_top_mirror,
    new TileClass(p, goomba_bottom, pallete, 5, 5),
    goomba_bottom_mirror,
  ];
}

export default goombaSprite;
