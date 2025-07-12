let heartUv;
let canvas;
let pageSize = 1024;
let gridSize = 5;
let step = 0;

function setup() {
  canvas = createCanvas(pageSize, pageSize, p5.SVG);
  background(255);
  stroke(150);

  heartUv = loadImage('data/gptheart.jpg');

}

function draw() {
  step+=10;
  background(255);
// preview image
// image(heartUv, 0, 0, width, height);
  stroke(255);
  strokeWeight(1);
  
  let xMultiplier1 = Math.sin(step/30)*5+11;
  let yMultiplier1 = Math.cos(step/30)*5+11;
  let xMultiplier2 = Math.sin(step/23)*4+6;
  let yMultiplier2 = Math.cos(step/23)*4+6;

  for (let y = 0; y <= width; y += gridSize) {
    for (let x = 0; x <= height; x += gridSize) {

      let point1 = heartUv.get(x, y);
      let point2 = heartUv.get(x + gridSize, y);
      
      if((point1[0] + point1[1] + point1[2]) > 15) {
        stroke(point1[0], point1[1], point1[2]);
        bezier(x, y, x+point1[0]/xMultiplier1, y+point1[1]/yMultiplier1,  
               x + gridSize, y, x-point2[0]/xMultiplier2, y-point2[1]/xMultiplier2);
      }
    }
  }
}
