function main(chain, lengths) {
    lengths = lengths.split(',').map(Number);
    let start = 0, skip = 0;
    for (let l of lengths) {
        let end = (start + l - 1) % chain.length;
        let count = ((l / 2) | 0) - 1, c = 0;
        while (c <= count) {
            let i = (start + c) % chain.length, j = (end - c < 0) ? chain.length + (end - c) : end - c;
            [chain[i], chain[j]] = [chain[j], chain[i]];
            c++;
        }
        start = (start + l + skip++) % chain.length;
    }
    return chain[0] * chain[1];
}

function main2(chain, lengths, rounds) {
    lengths = lengths.split('').map((char) => char.charCodeAt(0)).concat([17, 31, 73, 47, 23]);
    let start = 0, skip = 0, result = '';
    while (rounds) {
        for (let l of lengths) {
            let end = (start + l - 1) % chain.length;
            let count = ((l / 2) | 0) - 1, c = 0;
            while (c <= count) {
                let i = (start + c) % chain.length, j = (end - c < 0) ? chain.length + (end - c) : end - c;
                [chain[i], chain[j]] = [chain[j], chain[i]];
                c++;
            }
            start = (start + l + skip++) % chain.length;
        }
        rounds--;
    }

    let dense = [];
    for (let i = 0; i < 16; i++) {
        dense[i] = 0;
        for (let j = 0; j < 16; j++) {
            dense[i] ^= chain[i * 16 + j];
        }
    }
    return dense.map((num) => {
        let str = num.toString(16);
        return (str.length > 1)? str : '0' + str;
    }).join('');
}


var values = Array.from(Array(256).keys());
var input = '197,97,204,108,1,29,5,71,0,50,2,255,248,78,254,63';

console.log(main(values, input));
console.log(main2(values, input, 64));