const screen = document.getElementById("screen");
const p = screen.getContext("2d");

function render(instance) {
	p.clearRect(0, 0, screen.width, screen.height);

	instance.entities.forEach((entity) => {
		entity.calculateMovement();
		entity.render();
	});

	instance.game = window.requestAnimationFrame(() => render(instance));
}

export { render, p, screen };
