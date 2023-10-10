const canvas = document.getElementById("screen");
const body = document.getElementById("body");
const ctx = canvas.getContext("2d");
let raf;

const keyMap = {};
keyMap["w"] = false;
keyMap["a"] = false;
keyMap["d"] = false;

const rect = {
	x: 100,
	y: 100,
	vx: 0,
	vy: 0,
	width: 16,
	height: 16,
	color: "red",
	draw() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	},
};

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	rect.draw();
	rect.x += rect.vx;
	rect.y += rect.vy;

	if (rect.vy < 10) rect.vy += 0.25;
	else rect.vy = 10;

	if (rect.vx < 0) {
		rect.vx += 0.5;
	} else if (rect.vx > 0) {
		rect.vx += -0.5;
	}

	if (keyMap["w"] && rect.y + rect.height === canvas.height) {
		rect.vy = -10;
	}

	if (keyMap["a"]) {
		rect.vx -= 2;
		if (rect.vx < -5) {
			rect.vx = -5;
		}
	}

	if (keyMap["d"]) {
		rect.vx += 2;
		if (rect.vx > 5) {
			rect.vx = 5;
		}
	}

	if (rect.y + rect.vy > canvas.height - rect.height) {
		while (rect.y + rect.height < canvas.height) rect.y++;
		rect.vy = 0;
	}
	if (rect.x + rect.vx + rect.width > canvas.width) {
		while (rect.x + rect.width < canvas.width) rect.x++;
        rect.vx = 0;
	}
	if (rect.x + rect.vx > canvas.width || rect.x + rect.vx < 0) {
        while (rect.x > 0) rect.x--;
		rect.vx = 0;
	}

	raf = window.requestAnimationFrame(draw);
}

addEventListener("keydown", (e) => {
	if (e.key === "Enter" && !keyMap[e.key])
		raf = window.requestAnimationFrame(draw);
	else if (e.key === "Enter" && keyMap[e.key]) {
		window.cancelAnimationFrame(raf);
	}

	keyMap[e.key] = true;
});

addEventListener("keyup", (e) => {
	keyMap[e.key] = false;
});

rect.draw();
