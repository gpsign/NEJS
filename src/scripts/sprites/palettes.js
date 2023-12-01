import PaletteClass from "../classes/Palette.js";
import colors from "./colors.js";

const palettes = [
	new PaletteClass(colors.transparent, colors.pink, colors.brown, colors.black),
	new PaletteClass(
		colors.transparent,
		colors.lightblue,
		colors.blue,
		colors.black
	),
];

export default palettes;
