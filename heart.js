let heartUv;
let canvas;
let pageSize = 1024;
let gridSizeX = 5;
let gridSizeY = 4;
let step = 0;
let xs = [];
let xe = [];

function setup() {
  canvas = createCanvas(pageSize, pageSize, p5.SVG);
  background(255);
  stroke(150);

  loadImage('data/gptheart2.jpg', 
  (img) => {
    heartUv = img;
    analyze();
    }
  );
}

// find beginning and end of lines to save on performance
function analyze() {
  console.log("start");

  for (let y = 0; y <= height; y++) {
    let maxDarkRun = 0;
    let currentRun = 0;
    xe[y] = width;

    for (let x = 0; x <= width; x++) {
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
      xe[y] = width - currentRun;
    } else {
      xs[y] = currentRun;
    };
  }
}

function draw() {
  step+=10;
  background(0);
 // preview image
 //image(heartUv, 0, 0, width, height);
  stroke(255);
  strokeWeight(1);
  let xMultiplier1 = Math.sin(step/30)*5+10;
  let yMultiplier1 = Math.cos(step/30)*5+10;
  let xMultiplier2 = Math.sin(step/23)*4+12;
  let yMultiplier2 = Math.cos(step/23)*4+12;

  for (let y = 0; y <= height; y += gridSizeY) {
  strokeWeight(1);
  noFill();
  stroke(255);
  // preview line starts and ends
  //line(xs[y],y,xs[y],y);
  //line(xe[y],y,xe[y],y);
  //beginShape();
    for (let x = xs[y]; x <= xe[y]; x += gridSizeX) {

      let point0 = heartUv.get(x - gridSizeX, y);
      let point1 = heartUv.get(x, y);
      let point2 = heartUv.get(x + gridSizeX, y);
            
      //if((point1[0]+point1[1]+point1[2]) > 30) {
        
        stroke(point1[0], point1[0]+point1[2], point1[2]);
        //curveVertex(x-point1[0]/5+point1[0]/xMultiplier1,y-point1[2]/5+point1[2]/yMultiplier1);
        let offsetP1X=point1[0]/6;
        let offsetP2X=point2[0]/6;
        let offsetP1Y=point1[2]/5;
        let offsetP2Y=point2[2]/5;
        let p1xm = point1[0]/xMultiplier1;
        let p1ym = point1[2]/yMultiplier1
        let p2xm = point2[0]/xMultiplier1;
        let p2ym = point2[2]/yMultiplier1

        bezier(x+p1xm-offsetP1X,
               y+p1ym-offsetP1Y,
               (x+p1xm-offsetP1X + x+gridSizeX+p2xm-offsetP2X)/2,
               (y+p1ym-offsetP1Y + y+p2ym-offsetP2Y)/2,
               (x+p1xm-offsetP1X + x+gridSizeX+p2xm-offsetP2X)/2,
               (y+p1ym-offsetP1Y + y+p2ym-offsetP1Y)/2,
               x+gridSizeX+p2xm-offsetP2X,
               y+p2ym-offsetP2Y);
               
        //bezier(x + point1[0] / xMultiplier2 * point1[1] / 150, 
        //       y + point1[0] / yMultiplier2 * point2[1] / 150, 
        //       x + gridSizeX + point1[0] / xMultiplier1 * point1[1] / 150,
        //       y + point1[2] / yMultiplier1 * point1[1] / 150,
        //       x + gridSizeX, 
        //       y,
        //       x + gridSizeX + point2[0] / xMultiplier2 * point2[1] / 150, 
        //       y + point2[2] / yMultiplier2 * point2[1] / 150,
        //       );

      //}
    }
    //endShape();
  }
}
