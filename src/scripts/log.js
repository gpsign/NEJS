const debug = document.getElementById("debug");

export function log(entity, fields) {
	const entries = Object.entries(this);

	thisDebug = createDebugList(this.name, entries);
	debug.appendChild(thisDebug);
}

export function createDebugItem(key, value) {
	const container = document.createElement("div");
	container.style.display = "flex";

	const keyElement = document.createElement("h4");
	keyElement.innerHTML = key + ": ";
	const valueElement = document.createElement("p");
	valueElement.innerHTML = value;

	container.appendChild(keyElement);
	container.appendChild(valueElement);

	return container;
}

export function createDebugList(name, values) {
	const container = document.createElement("div");
	container.id = name;
	container.innerHTML = name + ": ";

	// let expanded = false;

	// container.style.maxHeight = "20px";
	// container.style.overflow = "hidden";
	// container.style.marginBottom = "20px";
	// container.onclick = () => {
	// 	if (container.style.maxHeight === "20px")
	// 		container.style.maxHeight = "unset";
	// 	else container.style.maxHeight = "20px";
	// };

	for (const [key, value] of values) {
		if (typeof value != "object")
			container.appendChild(createDebugItem(key, value));
	}

	return container;
}
