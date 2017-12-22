function main(input, rounds) {
	let map = {};
	let lines = input.split('\n');
	lines.forEach((line, i) => {
		line.split('').forEach((char, j) => {
			if (char === '#') {
				map[j + ',' + i] = 'infected';
			}
		})
	});
	let virus = new Carrier((lines[0].length - 1) / 2, (lines.length - 1) / 2, map);

	for (let i = 0; i < rounds; i++) {
		virus.burst();
	}

	return virus.infection;

}

class Carrier {
	constructor(x, y, infectedNodes) {
		this.x = x;
		this.y = y;
		this.direction = Carrier.up;
		this.infectedNodes = infectedNodes;
		this.infection = 0;
	}

	burst() {
		let coordinate = this.x + ',' + this.y;
		let state;
		if (!this.infectedNodes[coordinate]) {
			this.infectedNodes[coordinate] = 'clean';
		}
		state = Carrier.states[this.infectedNodes[coordinate]];
		this.direction = Carrier[this.direction[state.turn]];

		if (this.infectedNodes[coordinate] === 'weakened') {
			this.infection++;
		}

		this.infectedNodes[coordinate] = state.next;

		this.x += this.direction.x;
		this.y += this.direction.y;
	}

	static get up() {
		return {
			x: 0,
			y: -1,
			left: 'left',
			right: 'right',
			back: 'down',
			none: 'up'
		};
	}

	static get down() {
		return {
			x: 0,
			y: 1,
			left: 'right',
			right: 'left',
			back: 'up',
			none: 'down'
		};
	}

	static get left() {
		return {
			x: -1,
			y: 0,
			left: 'down',
			right: 'up',
			back: 'right',
			none: 'left'
		};
	}

	static get right() {
		return {
			x: 1,
			y: 0,
			left: 'up',
			right: 'down',
			back: 'left',
			none: 'right'
		};
	}

	static get states() {
		return {
			clean: {
				next: 'weakened',
				turn: 'left'
			},
			weakened: {
				next: 'infected',
				turn: 'none'
			},
			infected: {
				next: 'flagged',
				turn: 'right'
			},
			flagged: {
				next: 'clean',
				turn: 'back'
			}
		}
	}
}

main(document.body.firstChild.innerText.trim(), 1E4);