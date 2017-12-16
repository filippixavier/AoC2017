var programs = 'abcdefghijklmnop';

function main(input, programs) {
    let instructions = input.split(',');
    for(let instruction of instructions) {
       programs =  programs[instruction[0]](...instruction.substr(1).split('/'));
    }
    return programs;
}

Array.prototype.s = function swap (startIndex) {
    let index = Number(startIndex);
    return [...(this.slice(-index)), ...(this.slice(0, this.length -index))];
}

Array.prototype.x = function exchange (firstIndex, secondIndex) {
    let copy = this.slice();
    [copy[firstIndex], copy[secondIndex]] = [copy[secondIndex], copy[firstIndex]];
    return copy;
}

Array.prototype.p = function partner (nameA, nameB) {
    let indexA = this.indexOf(nameA), indexB = this.indexOf(nameB);
    return this.x(indexA, indexB);
}

console.log(main(document.body.firstChild.innerChild.trim(), programs.split(''))).join('');