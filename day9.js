function main(input) {
    let reg = /{|<|!|>|}/g
    let garbage = false;
    let groupScore = 1;
    let totalScore = 0;
    let char;
    while(char = reg.exec(input)) {
        if(garbage) {
            if(char[0] === '>') {
                garbage = false;
            } else if (char[0] === '!') {
                reg.lastIndex++;
            }
        } else {
            if(char[0] === '{') {
                totalScore += groupScore;
                groupScore++;
            } else if(char[0] === '<') {
                garbage = true;
            } else if(char[0] === '}') {
                groupScore--;
            }
        }
    }
    return totalScore
}

main(document.body.innerText);