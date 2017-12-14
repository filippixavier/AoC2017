function knotHash(chain, lengths, rounds) {
    lengths = lengths.split('').map((char) => char.charCodeAt(0)).concat([17, 31, 73, 47, 23]);
    let start = 0,
        skip = 0,
        result = '';
    while (rounds) {
        for (let l of lengths) {
            let end = (start + l - 1) % chain.length;
            let count = ((l / 2) | 0) - 1,
                c = 0;
            while (c <= count) {
                let i = (start + c) % chain.length,
                    j = (end - c < 0) ? chain.length + (end - c) : end - c;
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
        return (str.length > 1) ? str : '0' + str;
    }).join('');
}

function removeZone(hdd, line, column) {
    let count = 0;
    if (hdd[line] && hdd[line][column] === 1) {
        hdd[line][column] = 0;
        count++;
        count += removeZone(hdd, line - 1, column) + removeZone(hdd, line + 1, column) + removeZone(hdd, line, column - 1) + removeZone(hdd, line, column + 1);
    }

    return count;
}

function main(input) {
    let values = Array.from(Array(256).keys());
    let hdd = [];
    let used = 0;
    let zones = 0;
    for (let i = 0; i < 128; i++) {
        let hexa = knotHash(values.slice(), input + '-' + i, 64);
        let bin = '';
        for (let j = 0; j < hexa.length; j++) {
            bin += parseInt(hexa[j], 16).toString(2).padStart(4, 0);
        }
        hdd.push(bin);
    }
    used = hdd.reduce((acc, elem) => acc + elem).match(/1/g).length;
    let hddCopy = hdd.slice().map((line) => line.split('').map(Number));

    for (let i = 0; i < hdd.length; i++) {
        for (let j = 0; j < hdd[i].length; j++) {
            let count = 0; 
            count = removeZone(hddCopy, i, j);
            if (count > 0) {
                zones++;
            }
        }
    }

    return {
        used,
        zones
    };
}


main('jxqlasbh')