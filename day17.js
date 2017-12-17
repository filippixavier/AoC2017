function main(steps) {
    let buffer = [0];
    let index = 0;
    for(let i = 1; i < 2018; i++) {
        index = (index + steps) % buffer.length;
        buffer.splice(++index, 0, i);
    }
    return {index, buffer, next: buffer[index+1]};
}

console.log(main(304));