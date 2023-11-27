export default class PalleteClass {
	constructor(color_one, color_two, color_three, color_four) {
		this.data = [color_one, color_two, color_three, color_four];
	}
	get(i) {
		return this.data[i];
	}
}
