import { Particle } from './particle.js'

const margin = 50

export function Emitter(p5, { position, speed = 1, ranges = [[-Math.PI * 0.25, -Math.PI * 0.75]], renderParticle }) {
    this.position = position.copy();
    this.particles = [];
    /* Speed in particles per frame */
    this.speed = speed;
    
    this.debug = (fill = 127) => {
        p5.stroke('#0000ff99');
        p5.strokeWeight(5);
        p5.fill(fill);
        p5.point(this.position.x, this.position.y)
    }
    
    this.run = () => {
        const frequency = Math.round(1 / this.speed);
        if (p5.frameCount % frequency === 0) {
            const { x, y } = this.position;
            const position = x !== undefined && y !== undefined ? p5.createVector(x, y) : this.position;
            const particle = new Particle(p5, { position, ranges, render: renderParticle });
            this.particles.push(particle);
        }
        this.particles.forEach((particle, index) => {
            const { x, y } = particle.position;
            if ((x > p5.width + margin || x < -margin) || (y > p5.height + margin || y < -margin)) {
                this.particles.splice(index, 1)
            } else {
                particle.run();
            }
        })
    }
    
    this.applyForce = (force) => {
        for (let particle of this.particles) {
            particle.applyForce(force);
        }
    }
}
