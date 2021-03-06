function main(input) {
	let memBanks = input.split(/\s/).map(Number);
	let stringVersion = memBanks.join(' ');
	let controlSet = new Set();
	let iteration = 0;
	while (!controlSet.has(stringVersion)) {
		iteration++;
		controlSet.add(stringVersion);
		let index = memBanks.indexOf(Math.max(...memBanks));
		let value = memBanks[index];
		memBanks[index] = 0;
		while (value) {
			index = (index + 1) % memBanks.length;
			memBanks[index]++;
			value--;
		}
		stringVersion = memBanks.join(' ');
	}
	return [iteration, controlSet.size - [...controlSet].indexOf(stringVersion)];
}

main(document.body.firstChild.innerText.trim());