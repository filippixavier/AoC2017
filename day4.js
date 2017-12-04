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
			let letterCounts = line.split(' ')
				.map((current) => {
					let letterMap = {};
					for (let i = 0; current[i]; i++) {
						letterMap[current[i]] = letterMap[current[i]] ? letterMap[current[i]] + 1 : 1;
					}
					return letterMap;
				});
			for (let i = 0; letterCounts[i]; i++) {
				for (let j = i + 1; letterCounts[j]; j++) {
					if (compare(letterCounts[i], letterCounts[j])) {
						return acc;
					}
				}
			}
			return acc + 1;
		}, 0);
}

function compare(obj1, obj2) {
	let key1 = Object.keys(obj1),
		key2 = Object.keys(obj2);
	if (key1.length !== key2.length) {
		return false
	}
	for (let i = 0; key1[i]; i++) {
		if (obj1[key1[i]] !== obj2[key1[i]]) {
			return false;
		}
	}
	return true;
}

main2(document.body.firstChild.innerText.trim());