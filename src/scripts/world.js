export const world = {
	gravity: 1250,
	layers: {},
	group: (groupName) => {
		if (world[groupName]) return world[groupName];
		return [];
	},
	clock: 1,
};
