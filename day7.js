function main(input) {
	let programDescript = input.split('\n');
	let name;
	let weight = 0;
	let nodeMap = {};
	for (let line of programDescript) {
		let description = line.match(/(\w+)/g);
		name = description[0];
		if (!nodeMap[name]) {
			nodeMap[name] = { name };
		}
		nodeMap[name].weight = Number(description[1]);
		nodeMap[name].childs = description.slice(2);
		for (let child of nodeMap[name].childs) {
			if (!nodeMap[child]) {
				nodeMap[child] = {};
			}
			nodeMap[child].parent = name;
		}
	}

	while (nodeMap[name].parent) {
		name = nodeMap[name].parent;
	}

	recursiveWeight(nodeMap, name);
	weight = findUnbalance(nodeMap, name);

	return { name, weight };
}

function recursiveWeight(nodeMap, nodeName) {
	let node = nodeMap[nodeName];
	node.cumulatedWeight = node.weight;
	for (let child of node.childs) {
		node.cumulatedWeight += recursiveWeight(nodeMap, child);
	}

	return node.cumulatedWeight;
}

//Very bad and error prone: prefer using a dfs and return the first unbalanced node from the leaves
function findUnbalance(nodeMap, nodeName) {
	let weight,
		list = [nodeName];
	let fix;
	while (list.length > 0) {
		let parentNode = nodeMap[list.shift()];
		let count = 0;
		let firstNode = nodeMap[parentNode.childs[0]];
		let markedNode = firstNode;
		if (parentNode.childs.length === 0) {
			continue;
		}
		weight = nodeMap[parentNode.childs[0]].cumulatedWeight;
		for (let node of parentNode.childs) {
			if (weight !== nodeMap[node].cumulatedWeight) {
				markedNode = nodeMap[node];
				count++;
			}
			list.push(node);
		}
		if (count > 1) {
			fix = firstNode.weight + markedNode.cumulatedWeight - firstNode.cumulatedWeight;
			// return firstNode.weight + markedNode.cumulatedWeight - firstNode.cumulatedWeight;
		}
		else if (count === 1) {
			fix = markedNode.weight + firstNode.cumulatedWeight - markedNode.cumulatedWeight;
			// return markedNode.weight + firstNode.cumulatedWeight - markedNode.cumulatedWeight;
		}
	}
	return fix;
}

console.log(main(document.body.innerText.trim()));