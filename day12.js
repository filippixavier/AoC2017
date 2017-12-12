function main(input) {
	let pipes = input.split('\n').reduce((acc, curr) => {
		let flow = curr.split(' <-> ');
		let {from, to} = {from: Number(flow[0]), to: [...flow[1].split(',').map(Number)]}
		acc[from] = to;
		acc[from].checked = false;
		return acc;
	}, {});
	let nodes = [];
	let index = 0;
	let heap = [];
	for(let pipe of Object.keys(pipes)) {
		if(!pipes[pipe]) {
			continue;
		}
		nodes[index] = [pipe];
		heap.push(pipes[pipe]);
		pipes[pipe] = undefined;
		while(heap.length > 0) {
			let childs = heap.shift();
			for(let child of childs) {
				if(pipes[child]) {
					heap.push(pipes[child]);
					nodes[index].push(child);
					pipes[child] = undefined;
				}
			}
		}
		index++;
	}
	return nodes;
}

main(document.body.innerText.trim());