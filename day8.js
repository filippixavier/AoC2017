function main (input) {
	let regx = /(\w+) (\w+) (\d+) if (\w+) (.+) (\d+)/;
	let registries = {};
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

		if (opcodes[operation[4]](registries[operation[4]], +operation[5])) {
			registries[operation[0]] = opcodes[operation[1]](registries[operation[0]], +operation[2])
		}
	});

	return Math.max(Object.values(registries));
}

var test = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`;

main(test); 