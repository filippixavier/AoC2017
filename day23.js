function coprocessor(input) {
	let registers = [{}, {}],
		sound = 0,
		steps = [0, 0],
		heap = [
			[],
			[]
		],
        count = 0,
        mulcount = 0,
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
            sub: (index, x, value) => {
                registers[index][x] -= value;
            },
			mul: (index, x, value) => {
                mulcount++;
				registers[index][x] *= value;
			},
			mod: (index, x, value) => {
				registers[index][x] %= value;
			},
			jgz: (index, x, value) => {
				if (registers[index][x] > 0) {
					steps[index] += (value - 1);
				}
            },
            jnz: (index, x, value) => {
				if (registers[index][x] !== 0) {
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
	// registers[1].p = 1;

	while (steps[0] < instructions.length && steps[1] < instructions.length) {
		let a = instructions[steps[0]].ins(0, instructions[steps[0]].arg1, registers[0][instructions[steps[0]].arg2]);
			// b = instructions[steps[1]].ins(1, instructions[steps[1]].arg1, registers[1][instructions[steps[1]].arg2]);
		/*if (a && b) {
			return count;
        }*/
		steps[0]++;
	}

	return mulcount;
}