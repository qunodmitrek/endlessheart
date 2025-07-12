window.P5 = p5;

new p5((p5) => {
  let heartUv;
  let canvas;
  let pageSize = 1024;
  let gridSize = 20;
  let step = 30;
  let noiseOffset = 0;
  
  p5.setup = () => {
    canvas = p5.createCanvas(pageSize, pageSize);
    p5.background(255);
    p5.stroke(1);
    
    heartUv = p5.loadImage('data/gptheart2.jpg');
  }
  
  p5.draw = () => {
    step+=10;
    p5.background(255);
     //preview image
     //p5.image(heartUv, 0, 0, width, height);
    p5.stroke(0);
    p5.noFill();
    p5.strokeWeight(1);
    
    const points = [];
    
    for (let y = 0; y <= p5.width; y += gridSize) {
      for (let x = 0; x <= p5.height; x += gridSize) {
        
        let point1 = heartUv.get(x, y);
        
        if((point1[0] + point1[1] + point1[2]) > 15) {
          points.push({ x, y });
          points.push({ x: x-point1[1]/5, y: y-point1[1]/5 });
          points.push({ x: x+point1[1]/5, y: y+point1[1]/5 });
        }
      }
    }
    
    for (let i = 0; i < points.length; i ++) {
      if (i === 0) {
        continue;
      }
      const anchor1 = points[i - 1];
      const anchor2 = points[i];
      
      const [r, g, b] = heartUv.get(anchor1.x, anchor1.y)
      const value = (r + g + b) / 3
          const vector1 = P5.Vector.fromAngle(p5.radians(value) + p5.noise(anchor1.x + noiseOffset, anchor1.y + noiseOffset), 200)
          p5.stroke((i+step)/20 % 200);
      p5.bezier(anchor1.x, anchor1.y, anchor1.x + vector1.x, anchor1.y + vector1.y, anchor2.x - vector1.x, anchor2.y - vector1.y, anchor2.x, anchor2.y);
    }
    noiseOffset += 0.01;
  }
}, document.querySelector('main'));
