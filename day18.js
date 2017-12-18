var test = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;

function main(input, stop) {
	let registers = {};
	let sound = 0;
	let step = 0;
	let fnct = {
		snd: (x) => {
			sound = registers[x];
			step++;
		},
		set: (x, y) => {
			let value = (typeof y === 'string')? (registers[y]? registers[y] : (registers[y] = 0, 0)) : y
			registers[x] = value;
			step++;
		},
		add: (x, y) => {
			let value = (typeof y === 'string')? (registers[y]? registers[y] : (registers[y] = 0, 0)) : y
			registers[x] = registers[x]? registers[x] + value : value;
			step++;			
		},
		mul: (x, y) => {
			let value = (typeof y === 'string')? (registers[y]? registers[y] : (registers[y] = 0, 0)) : y
			registers[x] = registers[x]? registers[x] * value : 0;
			step++;			
		},
		mod: (x, y) => {
			let value = (typeof y === 'string')? (registers[y]? registers[y] : (registers[y] = 0, 0)) : y
			registers[x] = registers[x]? registers[x] % value : 0;
			step++;			
		},
		rcv: (x) => {
			if(registers[x]) {
				console.log(sound);
				return stop;
			}
			step++;			
		},
		jgz: (x, y) => {
			let value = (typeof y === 'string')? (registers[y]? registers[y] : (registers[y] = 0, 0)) : y
			if(registers[x]) {
				step += value;
				return false;
			}
			step++;			
		}
	};
	let instructions = input.split('\n').map((instruction) => {
		let element = instruction.split(' ');
		let secondArg = isNaN(parseInt(element[2]))? element[2] : parseInt(element[2]);
		return {ins: fnct[element[0]], args: [element[1], secondArg]};
	});
	while(true) {
		let instruction = instructions[step];
		if(instruction.ins(...instruction.args)) {
			break;
		}
	}
}

main(test, true);
main(document.body.firstChild.innerText.trim(), true);