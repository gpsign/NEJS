import { config, toggleConfig } from "./config.js";

export function toggleEditor() {
	toggleConfig("editorMode");

	const button = getEditorMenu();
	button.style.backgroundColor = config.editorMode ? "black" : "transparent";
}

export function toggleDebugger() {
	toggleConfig("debugMode");

	const button = getDebuggerMenu();
	button.style.backgroundColor = config.debugMode ? "black" : "transparent";
}

export function applyMenus() {
	const menus = document.getElementById("menus");
	menus.appendChild(editorMenu());
	menus.appendChild(debuggerMenu());
}

function editorMenu() {
	const button = document.createElement("button");
	button.id = "editor-button";
	button.onclick = toggleEditor;
	button.innerText = "Sprite Edit";

	button.style.backgroundColor = config.editorMode ? "black" : "transparent";

	return button;
}

function debuggerMenu() {
	const button = document.createElement("button");
	button.id = "debugger-button";
	button.onclick = toggleDebugger;
	button.innerText = "Debug";

	button.style.backgroundColor = config.debugMode ? "black" : "transparent";

	return button;
}

function getEditorMenu() {
	return document.getElementById("editor-button");
}

function getDebuggerMenu() {
	return document.getElementById("debugger-button");
}
