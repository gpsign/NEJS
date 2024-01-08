export const world = {
  gravity: 0.2,
  layers: {},
  group: (groupName) => {
    if (world[groupName]) return world[groupName];
    return [];
  },
  clock: 1,
};
