function main(input) {
    let smallestAcc = Infinity, smallestVelocity = Infinity, closestPoint = -1;
    let points = input.split('\n').map((line, index) => {
        let values = line.match(/(-?\d+)/g).map(Number);
        let pt = new Point({ x: values[0], y: values[1], z: values[2] }, { x: values[3], y: values[4], z: values[5] }, { x: values[6], y: values[7], z: values[8] });
        let acc = pt.distance('acceleration');
        let vel = pt.distance('velocity');
        if (acc < smallestAcc) {
            smallestAcc = acc;
            smallestVelocity = vel;
            closestPoint = index;
        } else if (acc === smallestAcc && vel < smallestVelocity) {
            smallestVelocity = vel;
            closestPoint = index;
        }
        return pt;
    });

    let collides = new Set();

    for(let tick = 0; tick < 1E3; tick++) {
        let lng = points.length;
        points.forEach(element => {
            element.nextTick();
        });
        for(let ptA = lng - 1; ptA >= 0; ptA--) {
            for(let ptB = ptA - 1; ptB >= 0; ptB--) {
                if(points[ptA].collide(points[ptB])) {
                    collides.add(ptA).add(ptB);
                }
            }
        }
        for(let index of collides) {
            points[index].deactivate();
        }
        collides.clear();
    }

    console.log(points.reduce((acc, current) => {
        if(current.active) {
            acc++;
        }
        return acc;
    },0));
    return closestPoint;
}

class Point {
    constructor(position, velocity, acceleration) {
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.active = true;
    }

    distance(key) {
        if (!this[key]) return;
        return (Math.abs(this[key].x) + Math.abs(this[key].y) + Math.abs(this[key].z))
    }

    nextTick() {
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
        this.velocity.z += this.acceleration.z;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.position.z += this.velocity.z;

        return this;
    }

    collide(point) {
        return this.active && this.position.x === point.position.x && this.position.y === point.position.y && this.position.z === point.position.z;
    }

    deactivate() {
        this.active = false;
    }
}

main(document.body.firstChild.innerText.trim());