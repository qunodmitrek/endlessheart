window.P5 = p5;

new p5((p5) => {
  let heartUv;
  let canvas;
  let pageSize = 1024;
  let gridSize = 15;
  let step = 20;
  let noiseOffset = 0;
  let xs = [];
  let xe = [];
  let cycleLength = 300;
  let cycleDrawmode = p5.BLEND;
  let cycleOverlayDrawmode = p5.BLEND;
  let cycleColor = [0, 0, 0];
  const drawmodes = [p5.BLEND, p5.REMOVE, p5.DARKEST, p5.LIGHTEST, p5.DIFFERENCE, p5.MULTIPLY, p5.EXCLUSION, p5.SCREEN, p5.REPLACE, p5.OVERLAY, p5.HARD_LIGHT, p5.SOFT_LIGHT, p5.DODGE, p5.BURN, p5.ADD]; 
  
  p5.setup = () => {
    canvas = p5.createCanvas(pageSize, pageSize);
    p5.background(255);
    p5.stroke(1);
    p5.frameRate(1060);

    heartUv = p5.loadImage('data/gptheart2.jpg',
      (img) => {
      heartUv = img;
      analyze();
      }
    );
  }
  
  analyze = () => {
    for (let y = 0; y <= p5.height; y++) {
      let maxDarkRun = 0;
      let currentRun = 0;
      xe[y] = p5.width;
  
      for (let x = 0; x <= p5.width; x++) {
        let point = heartUv.get(x, y);
        let brightness =point[1]+point[2]+point[0];
  
        if (brightness < 30) {
          currentRun++;
        } else {
          if(!xs[y]) {
            xs[y] = currentRun;
          };
          currentRun=1;
        }
      }
      
      if(xs[y]) {
        xe[y] = p5.width - currentRun;
      } else {
        xs[y] = currentRun;
      };
      //xs[y]=0;
      //xe[y]=p5.width;
    }
  }
  
  p5.draw = () => {
    cycleLength--;
    if(cycleLength <= 0) {
      gridSize = Math.round(p5.random(30,120));
      step = p5.random(5,80);
      cycleLength = p5.random(50, 150);
      cycleDrawmode = p5.random(drawmodes);
      cycleOverlayDrawmode = p5.random(drawmodes);
      cycleColor = [p5.random(0,255), p5.random(0,255), p5.random(0,255)];
      console.log(cycleColor, cycleLength, cycleDrawmode);
    };
    
    step+=10;
    p5.background(0);
    // preview image
    // p5.image(heartUv, 0, 0, width, height);
    p5.stroke(0);
    p5.noFill();
    p5.strokeWeight(1);
//    console.log(cycleDrawmode);
    p5.blendMode(cycleDrawmode);
//    canvas.clear();

    const points = [];
    const deferredPoints = [];
    
    for (let y = 0; y <= p5.width; y += gridSize) {
      for (let x = xs[y]; x <= xe[y]; x += gridSize) {
        
        let point1 = heartUv.get(x, y);
        
        if((point1[0] + point1[1] + point1[2]) > 15) {
          points.push({ x, y, row: false});
          points.push({ x: x-point1[1]/5, y: y-point1[1]/5 });
          points.push({ x: x+point1[1]/5, y: y+point1[1]/5 });
        }
      }
      if(points.length) {
        points[points.length-1].row=true;
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
          if(anchor1.row) {
            p5.blendMode(cycleOverlayDrawmode);
            p5.stroke((i+step*gridSize+500*gridSize)/(10*gridSize) % 200 / 2);
            p5.strokeWeight(3);
          } else {
            p5.blendMode(cycleDrawmode);
            p5.stroke(cycleColor[0], cycleColor[1], cycleColor[2]);
            p5.strokeWeight(1);
          }
      p5.bezier(anchor1.x, anchor1.y, anchor1.x + vector1.x, anchor1.y + vector1.y, anchor2.x - vector1.x, anchor2.y - vector1.y, anchor2.x, anchor2.y);
    }
    // let fps = p5.frameRate();
    // p5.text(fps, 50, 50);

    noiseOffset += 0.01;
  }
}, document.querySelector('main'));
