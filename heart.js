import { Emitter } from './common/emitter.js';

window.P5 = p5;

const emitterOrigins = [{x: 426, y: 290}, {x: 472, y: 287}, {x: 529, y: 289}, {x: 556, y: 297}, {x: 476, y: 326}, {x: 644, y: 429}, {x: 654, y: 464}, {x: 654, y: 490}]

new p5((p5) => {
  let heartUv;
  let canvas;
  let pageSize = 1024;
  let gridSize = 20;
  let step = 30;
  let noiseOffset = 0;
  const emitters = emitterOrigins.map(({ x, y }, index) => {
    const ranges = [4, 5, 6, 7].includes(index) ? [[-Math.PI * 0.25, Math.PI * 0.25]] : [[-Math.PI * 0.25, -Math.PI * 0.75]];
    return new Emitter(p5, { position: new P5.Vector(x, y), speed: 1, ranges })
  })
  const gravity = p5.createVector(0, 0.01);
  
  p5.setup = () => {
    canvas = p5.createCanvas(pageSize, pageSize);
    p5.background(255);
    p5.stroke(1);
    
    heartUv = p5.loadImage('data/gptheart2.jpg');
  }
  
  p5.draw = () => {
    step+=10;
    p5.background(255);
    var scale = 0.5;
    p5.imageMode(p5.CENTER);
    p5.image(heartUv, 0.5 * p5.width, 0.5 * p5.height, scale * p5.width, scale * heartUv.height * p5.width / heartUv.width);
    
    p5.stroke(0);
    p5.noFill();
    p5.strokeWeight(1);
    
    emitters.forEach((emitter) => {
      // emitter.debug();
      emitter.applyForce(gravity);
      emitter.run();
    });
   
    noiseOffset += 0.01;
  }
}, document.querySelector('main'));
