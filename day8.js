function main (input) {
	let regx = /(\w+) (\w+) (-?\d+) if (\w+) (.+) (-?\d+)/;
	let registries = {};
	let maxValue = 0;
	let opcodes = {
		'>' : (reg, value) => reg > value,
		'<' : (reg, value) => reg < value,
		'>=' : (reg, value) => reg >= value,
		'<=' : (reg, value) => reg <= value,
		'==' : (reg, value) => reg === value,
		'!=' : (reg, value) => reg !== value,
		'inc': (reg, value) => reg + value,
		'dec': (reg, value) => reg - value
	}

	let instructions = input.split('\n').map((line) => {
		let operation = line.match(regx).slice(1);
		registries[operation[0]] = registries[operation[0]] || 0;
		registries[operation[3]] = registries[operation[3]] || 0;

		if (opcodes[operation[4]](registries[operation[3]], +operation[5])) {
			registries[operation[0]] = opcodes[operation[1]](registries[operation[0]], +operation[2]);
			maxValue = Math.max(maxValue, registries[operation[0]]);
		}
	});

	console.log(maxValue);
	return Math.max(...Object.values(registries));
}

main(main(document.body.firstChild.innerText.trim())); 