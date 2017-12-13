function main(input) {
	let ranges = [],
		severity = 0;
	input.split('\n').forEach((elem) => {
		let convert = elem.match(/\d+/g).map(Number);
		ranges[convert[0]] = convert[1];
	});
	for (let i = 0; i < ranges.length; i++) {
		if (ranges[i] && !(i % ((ranges[i] - 1) * 2))) {
			severity += i * ranges[i];
		}
	}

	return severity;
}

main(document.body.innerText.trim());