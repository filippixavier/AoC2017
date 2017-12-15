function* generator(seed, factor, check) {
	let fact = factor;
	let input = seed;
	let divider = 2147483647;
	while(true) {
		input =  (input * factor) % divider;
		if(!(input % check)) {
			yield input;
		}
	}
}

function judge(valueA, valueB) {
	let mask = (1 << 16) - 1;
	return (valueA & mask) === (valueB & mask);
}

function main(seedA, seedB, mulA, mulB, limit) {
    let genA = generator(seedA, 16807, mulA), genB = generator(seedB, 48271, mulB);
    let count = 0
    for(let i = 0; i < limit; i++) {
    	if(judge(genA.next().value, genB.next().value)){
    		count++;
    	}
    }
    return count;
}

main(65, 8921, 1, 1, 40000000); //test star 1
main(591, 393, 1, 1, 40000000); //main star 1
main(65, 8921, 4, 8, 5000000); //test star 2
main(591, 393, 4, 8, 5000000); //main star 2