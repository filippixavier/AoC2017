function followPath(input) {
	let board = input.split('\n');
	let coordinate = {
		y: 0
	};
	let direction = directions.DOWN;
	let letters = '';
	let hasNext = true;
	let steps = 0;

	for (let x = 0; x < board[0].length; x++) {
		if (board[0][x] === '|') {
			coordinate.x = x;
			break;
		}
	}

	while (hasNext) {
		let current = board[coordinate.y][coordinate.x];
		let nextElement = board[coordinate.y + direction.y][coordinate.x + direction.x];
		if (current && current.match(/\w/) !== null) {
			letters += current;
		}

		if (!nextElement || !nextElement.trim()) {
			for (let nextDirection of direction.next) {
				let check = board[coordinate.y + directions[nextDirection].y][coordinate.x + directions[nextDirection].x];
				if (check === directions[nextDirection].token || check === '+' || check.match(/\w/)) {
					direction = directions[nextDirection];
					hasNext = true;
					break;
				}
				hasNext = false;
			}
		}

		coordinate.x += direction.x;
		coordinate.y += direction.y;
		steps++;
	}
	console.log(steps);
	return letters;
}

var directions = {
	UP: {
		x: 0,
		y: -1,
		token: '|',
		next: ['LEFT', 'RIGHT']
	},
	DOWN: {
		x: 0,
		y: 1,
		token: '|',
		next: ['LEFT', 'RIGHT']
	},
	LEFT: {
		x: -1,
		y: 0,
		token: '-',
		next: ['UP', 'DOWN']
	},
	RIGHT: {
		x: 1,
		y: 0,
		token: '-',
		next: ['UP', 'DOWN']
	}
}

followPath(document.body.firstChild.innerText);