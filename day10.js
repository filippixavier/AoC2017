function main(chain, lengths) {
    lengths = lengths.split(',').map(Number);
    let start = 0, skip = 0;
    for (let l of lengths) {
        let end = (start + l - 1) % chain.length;
        let count = ((l/2) | 0) - 1, c = 0;
        while(c <= count) {
            let i = (start + c) % chain.length, j = (end - c < 0)? chain.length + (end - c) : end - c;
            [chain[i], chain[j]] = [chain[j], chain[i]];
            c++;
        }
        start = (start + l + skip++) % chain.length;
    }
    return chain[0] * chain[1];
}

var test = Array.from(Array(256).keys());
var tl = '197,97,204,108,1,29,5,71,0,50,2,255,248,78,254,63';

console.log(main(test, tl));