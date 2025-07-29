import { Emitter } from './common/emitter.js';
import { getGrowth } from './common/collatz.js';

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
  let growthStep1 = 5;
  let growthStep2 = 5;
  let growthFrom1 = 10;
  let growthFrom2 = 100;
  
  p5.setup = () => {
    canvas = p5.createCanvas(pageSize, pageSize);
    p5.background(255);
    p5.stroke(1);
    
    heartUv = p5.loadImage('data/gptheart3.jpg');
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
    
    if (p5.frameCount < 150) {
      return;
    }
    
    p5.stroke(255, 0, 0, 100)
    const growth1 = getGrowth(p5, {
      from: growthFrom1,
      step: growthStep1,
      origin: {x: p5.width * 0.4, y: p5.height},
      initialAngle: p5.PI * 0.5,
      roundness: 5,
      optimized: true
    });
    const growth2 = getGrowth(p5, {
      from: growthFrom2,
      step: growthStep2,
      origin: {x: p5.width * 0.6, y: p5.height},
      initialAngle: p5.PI * 0.5,
      roundness: 4,
      optimized: true
    });
    
    growth1.forEach((curve) => {
      p5.beginShape();
      curve.forEach(({x, y}, index, curve) => {
        if (index === 0 || index === curve.length - 1) {
          p5.curveVertex(x, y);
        }
        p5.curveVertex(x, y)
      })
      p5.endShape();
    })
    
    growth2.forEach((curve) => {
      p5.beginShape();
      curve.forEach(({x, y}, index, curve) => {
        if (index === 0 || index === curve.length - 1) {
          p5.curveVertex(x, y);
        }
        p5.curveVertex(x, y)
      })
      p5.endShape();
    })
    
    growthStep1 = growthStep1 + 0.01;
    growthFrom1 = growthFrom1 + 2;
    
    growthStep2 = growthStep2 + 0.02;
    growthFrom2 = growthFrom2 + 1;
  }
}, document.querySelector('main'));
