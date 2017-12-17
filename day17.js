function after2017(steps, limit) {
    let buffer = [0];
    let index = 0;
    for(let i = 1; i <= limit; i++) {
        index = (index + steps) % buffer.length;
        buffer.splice(++index, 0, i);
    }
    return buffer[index+1];
}

function after0(steps, limit) {
    let index = 0, size = 1, value = 0;
    for(let i = 1; i <= limit; i++) {
        index = ((index + steps) % size)+1;
        size++;
        if((index - 1) === 0) {
            value = i;
        }
    }

    return value;
}

console.log(after2017(304, 2017));
console.log(after0(304, 50000000));