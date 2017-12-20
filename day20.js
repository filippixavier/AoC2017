function main(input) {
    let smallestAcc = Infinity, smallestVelocity = Infinity, closestPoints = -1;
    input.split('\n').map((line, index) => {
        let values = line.match(/(-?\d+)/g).map(Number);
        let pt = new Point({ x: values[0], y: values[1], z: values[2] }, { x: values[3], y: values[4], z: values[5] }, { x: values[6], y: values[7], z: values[8] });
        let acc = pt.distance('acceleration');
        let vel = pt.distance('velocity');
        if (acc < smallestAcc) {
            smallestAcc = acc;
            smallestVelocity = vel;
            closestPoints = index;
        } else if (acc === smallestAcc && vel < smallestVelocity) {
            smallestVelocity = vel;
            closestPoints = index;
        }
        return pt;
    });

    console.log(smallestAcc);
    return closestPoints;
}

class Point {
    constructor(position, velocity, acceleration) {
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
    }

    distance(key) {
        if(!this[key]) return;
        return (Math.abs(this[key].x) + Math.abs(this[key].y) + Math.abs(this[key].z))
    }
}