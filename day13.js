var delay = -1;
var text = document.body.innerText.trim();
var ranges = [];
text.split('\n').forEach((elem) => {
	let convert = elem.match(/\d+/g).map(Number);
	ranges.push([convert[0], convert[1]]);
});

function main() {
	let severity = 0;
	for (let range of ranges) {
		let [index, length] = range;
		if (!(index % ((length - 1) * 2))) {
			severity += index * length;
		}
	}

	return severity;
}

function main2(delay) {
	let severity = 0;
	for (let range of ranges) {
		let [index, length] = range;
		if (!(index % ((length - 1) * 2))) {
			return false;
		}
	}
	return true;
}


main();
while (main2(++delay));