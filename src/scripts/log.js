import { copyFields } from "./utils.js";

const debug = document.getElementById("debug");

export const debugList = {};

export function log(key, value) {
	const logItem = createLogItem(key, value);

	debug.appendChild(logItem);
}

export function logObject(object, fields) {
	const onlySelectedFields = copyFields(object, fields);
	let objectList = findLogList(object.name);

	if (objectList === undefined) {
		objectList = createLogList(object.name);
		debugList[object.name] = objectList;

		for (const [key, value] of Object.entries(onlySelectedFields))
			objectList.push(key, value);
	} else {
		for (const [key, value] of Object.entries(onlySelectedFields))
			objectList.update(key, value);
	}
}

export function createLogItem(key, value, parent = "") {
	const item = document.createElement("div");
	item.style.display = "flex";
	item.classList.add(parent);
	item.classList.add(key);

	const keyElement = document.createElement("h4");
	keyElement.innerHTML = key + ": ";
	keyElement.classList.add(key + "-key");

	const valueElement = document.createElement("p");
	valueElement.innerHTML = value;
	valueElement.classList.add(key + "-value");

	item.appendChild(keyElement);
	item.appendChild(valueElement);

	return item;
}

export function createLogList(name) {
	const list = document.createElement("div");
	list.id = name + "-list";
	list.innerHTML = name + ": ";
	list.style.margin = "20px 15px";

	function push(key, value) {
		if (value?.push) {
			for (let i = 0; i < value.length; i++)
				list.appendChild(createLogItem(key, value[i], name));
		} else list.appendChild(createLogItem(key, value, name));
	}
	function update(key, value) {
		const item = findLogItemValue(key, name);
		if (item) item.innerHTML = value;
	}

	debug.appendChild(list);
	return { list, push, update };
}

export function findLogList(key) {
	return debugList[key];
}

export function findLogItem(key, parent = undefined) {
	return document.querySelector("." + key + (parent ? "." + parent : ""));
}

export function findLogItemValue(key, parent = undefined) {
	return document.querySelector(
		`.${key}` + (parent ? `.${parent} ` : " ") + `.${key}-value`
	);
}
