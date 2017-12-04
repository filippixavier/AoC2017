function main(input, step) {
	let acc = 0;
	for (let i = 0; i < input.length; i++) {
		if (input[i] === input[(i + step) % input.length]) {
			console.log(input[i]);
			acc += +input[i];
		}
	}
	return acc;
}

var input = document.body.firstChild.innerText.trim();
main(input, 1);
main(input, input.length / 2);