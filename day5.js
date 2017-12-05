const input = document.body.firstChild.innerText.trim();
function main(input, increment) {
	let array = input.split('\n').map(Number),
		i = 0,
		count = 0;
	while (array[i] !== void 0) {
		let j = i + array[i];
		array[i] = increment(array[i]);
		i = j;
		count++;
	}
	return count;
}
main(input, (i) => i + 1);
main(input, (i) => (i >= 3) ? i - 1 : i + 1);