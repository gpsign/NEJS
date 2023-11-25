const screen = document.getElementById("screen");
const p = screen.getContext("2d");

const NESWidth = 256;
const NESHeight = 240;

//const widthRatio = screen.width / NESWidth;
//const heightRatio = screen.height / NESHeight;

const widthRatio = 1;
const heightRatio = 1;

function render(instance) {
	p.clearRect(0, 0, screen.width, screen.height);

	instance.world.camera.calculateX();
	instance.world.entities.forEach((entity) => {
		entity.calculateMovement();
		entity.render();
	});

	instance.world.walls.forEach((walls) => {
		walls.render();
	});
}

export { render, p, screen, widthRatio, heightRatio };
