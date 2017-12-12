function main(input) {
	let pipes = input.split('\n').reduce((acc, curr) => {
		let flow = curr.split(' <-> ');
		let {from, to} = {from: Number(flow[0]), to: [...flow[1].split(',').map(Number)]}
		acc[from] = to;
		acc[from].checked = false;
		return acc;
	}, []);
	let nodes = [];
	let heap = [0];
	pipes[0].checked = true;
	while(heap.length > 0) {
		let element = heap.shift();
		nodes.push(element);
		for(let child of pipes[element]) {
			if(!pipes[child].checked) {
				pipes[child].checked = true;
				heap.push(child);
			}
		}
	}
	return nodes;
}