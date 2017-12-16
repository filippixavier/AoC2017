var programs = 'abcdefghijklmnop';
var cycle = 1;

function main(input, programs, times) {
    let instructions = input.split(',');
    for (let i = 0; i < times; i++) {
        for (let instruction of instructions) {
            programs = programs[instruction[0]](...instruction.substr(1).split('/'));
        }
    }
    return programs;
}

Array.prototype.s = function swap(startIndex) {
    let index = Number(startIndex);
    return [...(this.slice(-index)), ...(this.slice(0, this.length - index))];
}

Array.prototype.x = function exchange(firstIndex, secondIndex) {
    let copy = this.slice();
    [copy[firstIndex], copy[secondIndex]] = [copy[secondIndex], copy[firstIndex]];
    return copy;
}

Array.prototype.p = function partner(nameA, nameB) {
    let indexA = this.indexOf(nameA), indexB = this.indexOf(nameB);
    return this.x(indexA, indexB);
}

var current = main(document.body.firstChild.innerText.trim(), programs.split(''), 1).join('');

while (current !== programs) {
    current = main(document.body.firstChild.innerText.trim(), current.split(''), 1).join('');
    cycle++;
}

console.log(main(document.body.firstChild.innerText.trim(), programs.split(''), (1000000000 % cycle)).join(''));