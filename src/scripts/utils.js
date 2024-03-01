export function contains(value, start, end, margin = 0) {
	if (value >= start + margin && value <= end - margin) return true;
	else return false;
}

export function lineOverlaps(A, B) {
	const [[A_start_X, A_start_Y], [A_end_X, A_end_Y]] = A;
	const [[B_start_X, B_start_Y], [B_end_X, B_end_Y]] = B;

	// const AVerticalInterval = Math.abs(A_end_Y - A_start_Y);
	// const AHorizontaInterval = Math.abs(A_end_X - A_start_X);

	// const BVerticalInterval = Math.abs(B_end_Y - B_start_Y);
	// const BHorizontalInterval = Math.abs(B_end_X - B_start_X);

	console.log(contains(A_start_X, B_end_X, B_start_X));

	if (
		contains(A_start_Y, B_end_Y, B_start_Y) ||
		contains(A_end_Y, B_start_Y, B_end_Y)
	) {
		return (
			contains(A_start_X, B_end_X, B_start_X) ||
			contains(A_end_X, B_end_X, B_start_X)
		);
	}

	return false;
}

let A = [
	[1, 1],
	[3, 1],
];
let B = [
	[2, 2],
	[2, -1],
];

lineOverlaps(A, B);

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

export function copyFields(object, fields = undefined) {
	let newObject = {};

	if (fields.push) for (const key of fields) newObject[key] = object[key];
	return newObject;
}

export function copyObject(object) {
	let newObject = {};

	for (const [key, value] of Object.entries(object)) {
		if (value.push) {
			newObject[key] = copyArray(value);
		} else if (typeof value === "object") {
			newObject[key] = copyObject(value);
		} else newObject[key] = value;
	}

	return newObject;
}

export function setObject(target, valueObject) {
	for (const [key, value] of Object.entries(valueObject)) {
		if (value.push) {
			target[key] = copyArray(value);
		} else if (typeof value === "object") {
			setObject(target[key], value);
		} else target[key] = value;
	}
}

export function copyArray(oldArray) {
	let newArray = [];

	for (const item of oldArray) {
		if (item.push) {
			newArray.push(copyArray(item));
		} else if (typeof item === "object") {
			newArray.push(copyObject(item));
		} else newArray.push(item);
	}

	return newArray;
}
