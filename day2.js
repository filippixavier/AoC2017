function main1(input) {
	const array = input.trim().split('\n')
	 .map((line) => line.trim().split(/\s+/g));
	return array
		.map((line) => {
			let min = Math.min(...line);
			let max = Math.max(...line);
			return max - min;
		})
		.reduce((acc, current) => {
			return acc + current;
		}, 0);
}
main(document.body.firstChild.innerText);

function main2(input) {
	const array = input.trim().split('\n')
	 .map((line) => line.trim().split(/\s+/g));
	return array
		.map((line) => {
			for(let i = 0; line[i]; i++) {
				for (let j = i+1; line[j]; j++) {
					let [min, max] = [Math.min(line[i], line[j]), Math.max(line[i], line[j])];
					if(!(max % min)) {
						return max/min;
					}
				}
			}
		})
		.reduce((acc, current) => acc + current, 0);
}
main2(document.body.firstChild.innerText);