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

export function repeat(array, num) {
	const aux = [];

	for (let i = 0; i < num; i++)
		for (let j = 0; j < array.length; j++) aux.push(array[j]);
	return aux;
}
