function main(input) {
	let registers = [{
		p: 0
	}, {
		p: 1
	}];
	let sound = 0;
	let steps = [0, 0];
	let heap = [
		[],
		[]
	];
	let sendCount = 0;
	let fnct = {
		snd: (index, x) => {
			sound = registers[index][x];
			heap[(index + 1) % 2].push(sound);
			steps[index]++;
			if (index) {
				sendCount++;
			}
		},
		rcv: (index, x) => {
			if (registers[index][x]) {
				console.log(sound);
			} else {
				registers[index][x] = 0;
			}
			if (heap[index].length >= 1) {
				registers[index][x] = heap[index].shift();
				steps[index]++;
				return;
			}
			return true;
		},
		set: (index, x, y) => {
			let value = (typeof y === 'string') ? (registers[index][y] ? registers[index][y] : (registers[index][y] = 0, 0)) : y
			registers[index][x] = value;
			steps[index]++;
		},
		add: (index, x, y) => {
			let value = (typeof y === 'string') ? (registers[index][y] ? registers[index][y] : (registers[index][y] = 0, 0)) : y
			registers[index][x] = registers[index][x] ? registers[index][x] + value : value;
			steps[index]++;
		},
		mul: (index, x, y) => {
			let value = (typeof y === 'string') ? (registers[index][y] ? registers[index][y] : (registers[index][y] = 0, 0)) : y
			registers[index][x] = registers[index][x] ? registers[index][x] * value : 0;
			steps[index]++;
		},
		mod: (index, x, y) => {
			let value = (typeof y === 'string') ? (registers[index][y] ? registers[index][y] : (registers[index][y] = 0, 0)) : y
			registers[index][x] = registers[index][x] ? registers[index][x] % value : 0;
			steps[index]++;
		},
		jgz: (index, x, y) => {
			let value = (typeof y === 'string') ? (registers[index][y] ? registers[index][y] : (registers[index][y] = 0, 0)) : y
			if (registers[index][x]) {
				steps[index] += value;
				return false;
			}
			steps[index]++;
		}

	};
	let instructions = input.split('\n').map((instruction) => {
		let element = instruction.split(' ');
		let firstArg = isNaN(parseInt(element[1])) ? element[1] : parseInt(element[1]);
		let secondArg = isNaN(parseInt(element[2])) ? element[2] : parseInt(element[2]);
		return {
			ins: fnct[element[0]],
			args: [firstArg, secondArg]
		};
	});
	while (steps[1] < instructions.length && steps[0] < instructions.length) {
		let instructionA = instructions[steps[0]],
			instructionB = instructions[steps[1]];
		let resultA = instructionA.ins(0, ...instructionA.args),
			resultB = instructionB.ins(1, ...instructionB.args);
		if (resultA && resultB) {
			return sendCount;
		}
	}
}
main(document.body.firstChild.innerText.trim());


function main2(input) {
	let registers = [{}, {}],
		sound = 0,
		steps = [0, 0],
		heap = [
			[],
			[]
		],
		count = 0,
		fnct = {
			snd: (index, x) => {
				sound = registers[index][x];
				heap[(index + 1) % 2].push(sound);
				if (index) {
					count++;
				}
			},
			rcv: (index, x) => {
				if (registers[index][x]) {
					console.log(sound);
				}
				if (heap[index].length === 0) {
					steps[index]--;
					return true;
				}
				registers[index][x] = heap[index].shift();
			},
			set: (index, x, value) => {
				registers[index][x] = value;
			},
			add: (index, x, value) => {
				registers[index][x] += value;
			},
			mul: (index, x, value) => {
				registers[index][x] *= value;
			},
			mod: (index, x, value) => {
				registers[index][x] %= value;
			},
			jgz: (index, x, value) => {
				if (registers[index][x] > 0) {
					steps[index] += (value - 1);
				}
			}
		};
	const instructions = input.split('\n').map((instr) => {
		let elems = instr.split(' ');
		let obj = {
			ins: fnct[elems[0]]
		};
		let elem1 = parseInt(elems[1]),
			elem2 = parseInt(elems[2]);
		elem1 = isNaN(elem1) ? (registers[0][elems[1]] = registers[1][elems[1]] = 0, elems[1]) : (registers[0][elem1] = registers[1][elem1] = elem1, elem1);
		elem2 = isNaN(elem2) ? (registers[0][elems[2]] = registers[1][elems[2]] = 0, elems[2]) : (registers[0][elem2] = registers[1][elem2] = elem2, elem2);
		obj.arg1 = elem1;
		obj.arg2 = elem2;
		return obj;
	});

	registers[0].p = 0;
	registers[1].p = 1;

	while (steps[0] < instructions.length && steps[1] < instructions.length) {
		let a = instructions[steps[0]].ins(0, instructions[steps[0]].arg1, registers[0][instructions[steps[0]].arg2]),
			b = instructions[steps[1]].ins(1, instructions[steps[1]].arg1, registers[1][instructions[steps[1]].arg2]);
		if (a && b) {
			return count;
		}
		steps[0]++;
		steps[1]++;
	}

	return count;
}
main2(document.body.firstChild.innerText.trim());