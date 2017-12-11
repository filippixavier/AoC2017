function main(input) {
	let max = 0;
	let value = input.split(',').map((step) => {
		switch (step) {
		case 'n':
			return [1, 0];
		case 'ne':
			return [0.5, 1];
		case 'nw':
			return [0.5, -1];
		case 's':
			return [-1, 0];
		case 'se':
			return [-0.5, 1];
		case 'sw':
			return [-0.5, -1];
		}
	}).reduce((acc, current) => {
		let temp = [acc[0] + current[0], acc[1] + current[1]];
		let dist = Math.abs(temp[0]) - (Math.abs(temp[1]) * 0.5) + Math.abs(temp[1]);
		max = (dist > max)? dist : max;
		return temp;
	}, [0,0]).map(val => Math.abs(val));
	console.log(max);
	return value[0] - (value[1] * 0.5) + value[1];
}

main(document.body.innerText.trim());