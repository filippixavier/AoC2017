function main(input, turns) {
	let picture = [
		['.', '#', '.'],
		['.', '.', '#'],
		['#', '#', '#']
	];
	let rules = {
		two: {},
		three: {}
	};
	let count = 0;

	input.split('\n').forEach(line => {
		let [key, value] = line.split(' => ');
		if (key.length === 5) {
			rules.two[key] = value;
		} else {
			rules.three[key] = value;
		}
	})

	while (count < turns) {
		let newPicture = [];
		let increment = ((picture.length % 2) === 0) ? 2 : 3;
		for (let i = 0; i < (picture.length) / increment; i++) {
			for (let j = 0; j < (picture.length) / increment; j++) {
				let pixel = [];
				for (let offset = 0; offset < increment; offset++) {
					pixel[offset] = picture[i * increment + offset].slice((j * increment), (j * increment) + increment);
				}
				pixel = applyRule(pixel, increment === 2 ? rules.two : rules.three);
				pixel.forEach((elem, index) => {
					let posi = (i * (increment + 1)) + index;
						if (!Array.isArray(newPicture[posi])) {
							newPicture[posi] = [];
						}
					newPicture[posi] = newPicture[posi].concat(elem);
				});
			}
		}
		picture = newPicture;
		count++;
	}
	return picture;
}


function applyRule(pixel, rules) {
	let key = pixel.map((line) => line.join('')).join('/');
	let rotate = 0;
	while (!rules[key] || rotate < 8) {
		key = key.split('/').map((l, index, array) => {
			let temp = '';
			for (let i = array.length - 1; i >= 0; i--) {
				temp += array[i][index];
			}
			return temp;
		}).join('/');
		if (rotate === 4) {
			key = key.split('/').map((line) => line.split('').reverse().join('')).join('/');
		}
		rotate++;
	}

	return rules[key].split('/').map((line) => line.split(''));
}

main(document.body.firstChild.innerText.trim(), 5).reduce((acc, elem) => acc + elem.filter(char => char === '#').length, 0);
main(document.body.firstChild.innerText.trim(), 18).reduce((acc, elem) => acc + elem.filter(char => char === '#').length, 0);