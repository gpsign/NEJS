export default class ColorClass {
	constructor(name, r = 0, g = 0, b = 0, a = 255) {
		if (a > 0) a = 255;
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
		this.name = name;
	}
}
