let count = 0;
let ribbon = [];
let status = {state: 'A', index: 0};
const states = {
    A: (status, ribbon) => {
        let value = ribbon[status.index];
        if (!value) {
            ribbon[status.index] = 1;
            count++;
            status.state = 'B';
            status.index++;
        } else {
            ribbon[status.index] = 0;
            count--;
            status.index--;
            status.state = 'D'
        }
    },
    B: (status, ribbon) => {
        let value = ribbon[status.index];
        if (!value) {
            ribbon[status.index] = 1;
            count++;
            status.index++;
            status.state = 'C';
        } else {
            ribbon[status.index] = 0;
            count--;
            status.index++;
            status.state = 'F';
        }
    },
    C: (status, ribbon) => {
        let value = ribbon[status.index];
        if (!value) {
            ribbon[status.index] = 1;
            count++;
            status.index--;
        } else {
            status.index--;
            status.state = 'A';
        }
    },
    D: (status, ribbon) => {
        let value = ribbon[status.index];
        if (!value) {
            ribbon[status.index] = 0;
            status.index--;
            status.state = 'E';
        } else {
            status.index++;
            status.state = 'A';
        }
    },
    E: (status, ribbon) => {
        let value = ribbon[status.index];
        if (!value) {
            ribbon[status.index] = 1;
            count++;
            status.index--;
            status.state = 'A';
        } else {
            ribbon[status.index] = 0;
            count--;
            status.index++;
            status.state = 'B';
        }
    },
    F: (status, ribbon) => {
        let value = ribbon[status.index];
        if (!value) {
            ribbon[status.index] = 0;
            status.index++;
            status.state = 'C';
        } else {
            ribbon[status.index] = 0;
            count--;
            status.index++;
            status.state = 'E';
        }
    },
}

for(let i = 0; i < 12317297; i++) {
    states[status.state](status, ribbon);
}

console.log(count);