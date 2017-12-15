function* generator(seed, factor) {
	let fact = factor;
	let input = seed;
	let divider = 2147483647;
	while(true) {
		input =  (input * factor) % divider;
		yield input;
	}
}

function judge(valueA, valueB) {
	let mask = (1 << 16) - 1;
	return (valueA & mask) === (valueB & mask);
}

function main(seedA, seedB) {
    let genA = generator(seedA, 16807), genB = generator(seedB, 48271);
    let count = 0
    for(let i = 0; i < 40000000; i++) {
    	if(judge(genA.next().value, genB.next().value)){
    		count++;
    	}
    }
    return count;
}