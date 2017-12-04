function main1(input) {
	let reg = /\b(\w+)\b.*\b\1\b/g;
	return input.split('\n')
		.reduce((acc, line) => {
			if (line.match(reg) === null) {
				return acc + 1;
			}
			return acc;
		}, 0);
}

main1(document.body.firstChild.innerText.trim());

function main2(input) {
	let reg;
	return input.split('\n')
		.reduce((acc, line) => {
			line.split(' ');
			return acc;
		}, 0);
}