/** A particle which you can apply forces to and which keeps its trace */

const traceParticle = (p5, point, points = []) => {
    points.forEach(({ x, y }, index, points) => {
        const weight = p5.map(index, 0, points.length - 1, 2, 5);
        p5.strokeWeight(weight)
        p5.stroke(255, 0, 0, 255);
        p5.point(x, y)
    })
}

export function Particle(p5, { position, ranges = [[0, Math.PI], [Math.PI, Math.PI * 2]], limit = 20, render = traceParticle }) {
    const rangeIndex = Math.round(p5.random(ranges.length - 1));
    const [from, to] = ranges[rangeIndex]
    const angle = p5.random(from, to)
    this.position = position instanceof P5.Vector ? position : new p5.createVector(position.x, position.y);
    this.velocity = P5.Vector.fromAngle(angle, p5.random(1, 5));
    this.acceleration = p5.createVector(0, 0);
    this.limit = limit;
    this.points = [];
    
    this.run = () => {
        this.update();
        const point = { x: this.position.x, y: this.position.y };
        this.points.push()
        render(p5, point, this.points);
    }
    
    this.applyForce = (force) => {
        this.acceleration.add(force);
    }
    
    this.update = () => {
        if (this.points.length >= limit) {
            this.points = this.points.slice(-limit)
        }
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        
        this.velocity.limit(5);
        this.points.push({ x: this.position.x, y: this.position.y })
    }
}
