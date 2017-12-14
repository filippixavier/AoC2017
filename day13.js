var delay = 10;
var text = document.body.innerText.trim();

function main(input, delay) {
	let del = delay || 0;
	let ranges = [],
		severity = 0;
	input.split('\n').forEach((elem) => {
		let convert = elem.match(/\d+/g).map(Number);
		ranges[convert[0]] = convert[1];
	});
	for (let i = 0; i < ranges.length; i++) {
		if (ranges[i] && !((i + del) % ((ranges[i] - 1) * 2))) {
			severity += i * ranges[i];
		}
	}

	return severity;
}

function main2(input, delay) {
	let del = delay || 0;
	let ranges = [],
		severity = 0;
	input.split('\n').forEach((elem) => {
		let convert = elem.match(/\d+/g).map(Number);
		ranges[convert[0]] = convert[1];
	});
	for (let i = 0; i < ranges.length; i++) {
		if (ranges[i] && !((i + delay) % ((ranges[i] - 1) * 2))) {
			return false;
		}
	}

	return true;
}


main(text);
while(main2(text, delay) !== 0) delay++;