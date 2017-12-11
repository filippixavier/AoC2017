function main(input) {
	let n = /n\b/g, ne = /ne/g, se = /se/g, s = /s\b/g, sw = /sw/g, nw = /nw/g;
	let steps = [input.match(n), input.match(ne), input.match(se), input.match(s), input.match(sw), input.match(nw)].map((elem) => elem ? elem.length : 0);
	for(let i = 0; i < steps.length/2; i++) {
		let opposite = (i+3)%6;
		let a = steps[i] - steps[opposite];
		steps[i] = steps[opposite] = 0;
		if(a > 0) {
			steps[i] = a;
		} else {
			steps[opposite] = -a;
		}
	}
	for(let i = 0; i < steps.length; i++) {
		let left = i-1 < 0? steps.length - 1 : i - 1;
		let right = (i+1) % steps.length;
		let min = Math.min(steps[left], steps[right]);
		steps[i] += min;
		steps[left] -= min; steps[right] -= min;
	}

	return steps.reduce((acc, current) => acc + current, 0);
}

main(document.body.innerText.trim());