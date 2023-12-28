import applyConfig from "./applyConfigs.js";

export const config = {
	editorMode: false,
	debugMode: true,
};

export function toggleConfig(field) {
	config[field] = !config[field];
	applyConfig();
}
