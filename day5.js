.split('\n').map(Number);

function main(input) {
	let array = input.split('\n').map(Number), i = 0, count = 0;
	while(array[i] !== void 0) {
		let j = i + array[i];
		array[i]++;
		i = j;
		count++;
	}
	return count;
}

main(document.body.firstChild.innerText.trim());