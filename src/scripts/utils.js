export function contains(value, start, end) {
	if (value >= start && value <= end) return true;
	else return false;
}

export function lineOverlapse(...args) {
	let result = false;

	for (const i of args) if (i === undefined) return;

	if (args.length > 2) {
		const [aStart, aEnd, bStart, bEnd] = args;

		if (contains(aStart, bStart, bEnd) || contains(aEnd, bStart, bEnd))
			result = true;
		else if (aStart <= bStart && aEnd >= bEnd) result = true;
	} else if (args[0].push && args[1].push) {
		const [aStart, aEnd] = args[0];
		const [bStart, bEnd] = args[1];

		if (contains(aStart, bStart, bEnd) || contains(aEnd, bStart, bEnd))
			result = true;
		else if (aStart <= bStart && aEnd >= bEnd) result = true;
	}
	return result;
}

export function unfold(array) {
	const aux = [];
	if (!array.push) return;

	function recursion(refArray) {
		refArray.forEach((value) => {
			if (value.push) recursion(value);
			else aux.push(value);
		});
	}

	recursion(array);

	return aux;
}

export function repeat(fun, num) {
	for (let i = 0; i < num; i++) fun();
}

export function repeatArrayValues(array, num) {
	const aux = [];

	for (let i = 0; i < num; i++) {
		for (let j = 0; j < array.length; j++) {
			aux.push(array[j]);
		}
	}
	return aux;
}

export function scaleMatrice(matrice, xRatio = 1, yRatio = 1) {
	const scaledLines = repeatArrayValues(matrice, yRatio);
	const scaledColumns = [];

	for (let i = 0; i < scaledLines.length; i++)
		scaledColumns.push(repeatArrayValues(scaledLines[i], xRatio));

	return scaledColumns;
}

export function isValid(...args) {
	for (let i = 0; i < args.length; i++) {
		const value = args[i];

		if (
			value === undefined ||
			value === null ||
			value === "" ||
			value.length < 1
		)
			return false;
		// if (value.push && recursive) {
		// 	return value.forEach((childValue) => isValid(childValue));
		// }
		// if (typeof value === "object" && recursive) {
		// 	return isValid(Object.entries(value));
		// }
	}

	return true;
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
