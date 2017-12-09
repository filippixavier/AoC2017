function main(input) {
    let reg = /{|<|!|>|}/g
    let garbage = false;
    let groupScore = 1;
    let totalScore = 0;
    let garbageCollected = 0;
    let garbageStartIndex;
    let notCounted = 0;
    let char;
    while(char = reg.exec(input)) {
        if(garbage) {
            if(char[0] === '>') {
                garbage = false;
                garbageCollected += reg.lastIndex - garbageStartIndex - 1 - notCounted;
                notCounted = 0;
            } else if (char[0] === '!') {
                reg.lastIndex++;
                notCounted += 2;
            }
        } else {
            if(char[0] === '{') {
                totalScore += groupScore;
                groupScore++;
            } else if(char[0] === '<') {
                garbage = true;
                garbageStartIndex = reg.lastIndex;
            } else if(char[0] === '}') {
                groupScore--;
            }
        }
    }
    return {totalScore, garbageCollected}
}

main(document.body.innerText);