function main(input) {
    let nodes = input.split('\n').map((line) => new Element(line));
    return bfs([], nodes, 0, 0);
}

function main2(input) {
    let nodes = input.split('\n').map((line) => new Element(line));
    return bfslength([], nodes, 0, 0);
}

function bfs(array, nodes, value, sum) {
    let maxSum = sum
    for (let node of nodes) {
        if (array.indexOf(node) === -1 && node.connect(value) > -1) {
            let current = bfs([...array, node], nodes, node.connect(value), sum + node.sum);
            if (current > maxSum) {
                maxSum = current;
            }
        }
    }
    return maxSum;
}

function bfslength(array, nodes, value, sum) {
    let maxSum = sum;
    let maxLength = array.length;
    for (let node of nodes) {
        if (array.indexOf(node) === -1 && node.connect(value) > -1) {
            let current = bfslength([...array, node], nodes, node.connect(value), sum + node.sum);
            if (current.length > maxLength) {
                maxLength = current.length;
                maxSum = current.sum;
            } else if(current.length === maxLength && current.sum > maxSum) {
                maxSum = current.sum;
            } 
        }
    }
    return { sum: maxSum, length: maxLength };
}

class Element {
    constructor(pins) {
        [this.a, this.b] = pins.split('/').map(Number);
    }
    connect(pin) {
        if (pin === this.a) {
            return this.b;
        } else if (pin === this.b) {
            return this.a;
        }
        return -1;
    }
    get sum() {
        return this.a + this.b;
    }
}

var test = `0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`;

var input = `25/13
4/43
42/42
39/40
17/18
30/7
12/12
32/28
9/28
1/1
16/7
47/43
34/16
39/36
6/4
3/2
10/49
46/50
18/25
2/23
3/21
5/24
46/26
50/19
26/41
1/50
47/41
39/50
12/14
11/19
28/2
38/47
5/5
38/34
39/39
17/34
42/16
32/23
13/21
28/6
6/20
1/30
44/21
11/28
14/17
33/33
17/43
31/13
11/21
31/39
0/9
13/50
10/14
16/10
3/24
7/0
50/50
`;

console.log(main(input));
console.log(main2(input));