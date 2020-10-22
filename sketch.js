var boxSz = 250;
var numSpheres = 300;
var x = [];
var y = [];
var z = [];
var t = 0.0;

imgsrc = "./shapes/sphere.png"
//imgsrc = "./Rounded_cube.jpg"
// imgsrc = "./Juicer.jpg"
// imgsrc = "./s_sculpt.jpg"
img = 0



function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}




function preload() {
  img = loadImage(imgsrc);
}
let imgWidth = 126
let imgHeight = 126

let numPoints = 100
let points = []
for(let i=0; i<numPoints; i++){

  dirX = getRandomIntInclusive(0, 100) / 100.0
  dirY = getRandomIntInclusive(0, 100) / 100.0

  points[i] = {
    x: getRandomIntInclusive(0, imgWidth),
    y: getRandomIntInclusive(0, imgWidth),
    dir: [dirX, dirY]
  }
}



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  background(0);

  for (var i = 0; i < numSpheres; i++) {
    x[i] = random(-boxSz, boxSz);
    y[i] = random(-boxSz, boxSz);
    z[i] = random(-boxSz, boxSz);
  }
  // println(x);
  // println(y);
  // println(z);
  img.loadPixels();

}

function draw() {
  background(255);
  translate(0,20,-100);
  rotateY(frameCount * 0.05);
  
  stroke(51);

  let offset = 3
  let modelScale = 1
  let modelOffset = -256/2
  push()
  translate(modelOffset * modelScale, modelOffset * modelScale, modelOffset * modelScale);
  let P1 = {}
  let P2 = {}
  points.forEach(point=>{
    point.x +=  0.75 * point.dir[0]
    point.y +=  0.75 * point.dir[1]

    if(point.x < 0 || point.x > imgWidth) 
      point.dir[0] = -point.dir[0]
    if(point.y < 0 || point.y > imgWidth) 
      point.dir[1] = -point.dir[1]

    let x = Math.trunc(point.x)
    let y = Math.trunc(point.y)
    let off = (x * imgWidth + y) * 4;

    var c = [
      img.pixels[off],
      img.pixels[off + 1],
      img.pixels[off + 2],
      img.pixels[off + 3]
    ];

    //console.log(c)
    push();
    //translate(i * offset, j * offset, 0);
    stroke(c[0], c[1], c[2], 255)
    //stroke(0)
    //console.log(c[0])
    strokeWeight(5)
    translate(c[0] * modelScale, c[1] * modelScale, c[2] * modelScale);
    //line(0, -2.5, 0, 0,2.5, 0)
    fill('rgba(200,169,169,0.5)');
    circle(0,0, 5);
    pop();

    // draw lines/triagngles
    points.forEach(p2=>{
      if(p2 != point){
        let x2 = Math.trunc(p2.x)
        let y2 = Math.trunc(p2.y)
        let off2 = (x2 * imgWidth + y2) * 4;
        var c2 = [
          img.pixels[off2],
          img.pixels[off2 + 1],
          img.pixels[off2 + 2],
          img.pixels[off2 + 3]
        ];

        d = dist(c[0] * modelScale, c[1] * modelScale, c[2] * modelScale, c2[0] * modelScale, c2[1] * modelScale, c2[2] * modelScale)
        threshold = 60.0
        if(d < threshold){
          stroke(255 * (d/threshold))
          strokeWeight(1)
          line(c[0] * modelScale, c[1] * modelScale, c[2] * modelScale, c2[0] * modelScale, c2[1] * modelScale, c2[2] * modelScale)
        }
      }
    })
  })




  pop()
}