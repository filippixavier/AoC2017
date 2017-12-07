function main(input) {
	let programDescript = input.split('\n');
	let name;
	let weight = 0;
	let nodeMap = {};
	for (let line of programDescript) {
		let description = line.match(/(\w+)/g);
		name = description[0];
		if(!nodeMap[name]) {
			nodeMap[name] = {};
		}
		nodeMap[name].weight = Number(description[1]);
		nodeMap[name].childs = description.slice(2);
		for (let child of nodeMap[name].childs) {
			if(!nodeMap[child]) {
				nodeMap[child] = {};
			}
			nodeMap[child].parent = name;
		}
	}

	while(nodeMap[name].parent) {
		name = nodeMap[name].parent;
	}

	recursiveWeight(nodeMap, name);
	weight = findUnbalance(nodeMap, name);

	return {name, weight};
}

function recursiveWeight(nodeMap, nodeName) {
	for(let node of nodeMap[nodeName].childs) {
		nodeMap[nodeName].weight += recursiveWeight(nodeMap, node);
	}
	return nodeMap[nodeName].weight;
}

function findUnbalance (nodeMap, nodeName) {
	let weight,
		list = [nodeName];
	while(list.length > 0) {
		let name = list.shift();
		if(nodeMap[name].childs.length === 0) {
			continue;
		}
		weight = nodeMap[nodeMap[name].childs[0]].weight;
		let count = 0;
		for(let node of nodeMap[name].childs) {
			if(weight !== nodeMap[node].weight) {
				count++;
			}
			list.push(node);
		}
		if(count > 1) {
			return nodeMap[nodeMap[name].childs[1]].weight;
		}
		else if(count === 1) {
			return weight;
		}
	}
}

var test = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`

main(test);