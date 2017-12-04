function main1(input) {
	let reg = /\b(\w+)\b.*\b\1\b/g;
	let array = input.split('\n');
	return array.reduce((acc, line) => {
		if(line.match(reg) === null) {
			return acc+1;
		}
		return acc;
	}, 0);
}

main1(document.body.firstChild.innerText.trim());