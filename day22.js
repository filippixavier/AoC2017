function main(input, rounds) {
	let map = {};
	let lines = input.split('\n');
	lines.forEach((line, i) => {
		line.split('').forEach((char, j) => {
			if (char === '#') {
				map[j + ',' + i] = true;
			}
		})
	});
	let virus = new Carrier((lines[0].length - 1) / 2, (lines.length - 1) / 2 , map);

	for(let i = 0; i < rounds; i++) {
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
		let infected = !!this.infectedNodes[coordinate];
		this.direction = Carrier[this.direction[infected? 'right' : 'left']];
		this.infectedNodes[coordinate] = !infected;
		if(!infected) {
			this.infection++;
		}

		this.x += this.direction.x;
		this.y += this.direction.y;
	}

	static get up() {
		return {
			x: 0,
			y: -1,
			left: 'left',
			right: 'right'
		};
	}

	static get down() {
		return {
			x: 0,
			y: 1,
			left: 'right',
			right: 'left'
		};
	}

	static get left() {
		return {
			x: -1,
			y: 0,
			left: 'down',
			right: 'up'
		};
	}

	static get right() {
		return {
			x: 1,
			y: 0,
			left: 'up',
			right: 'down'
		};
	}
}

main(document.body.firstChild.innerText.trim(), 1E4);