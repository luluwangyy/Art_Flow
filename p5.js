var inc = 0.1;
var scl = 10;
var cols, rows;
var zoff = 0;
var particles = [];
var flowfield;

function setup() {
  createCanvas(1250, 990);
  //colorMode(HSB, 255);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);

  let centerX = width / 2; // Center of the circle on the X axis
  let centerY = height / 2; // Center of the circle on the Y axis
  let radius = min(width, height) / 4; // Radius of the circle
  let totalParticles = 100; // Total number of particles to place along the circle's outline
  let angleStep = TWO_PI / totalParticles; // The step in angle between each particle

  for (let i = 0; i < totalParticles; i++) {
    let angle = i * angleStep; // Current angle

    // Calculate the x and y position based on the angle
    let x = centerX + radius * cos(angle);
    let y = centerY + radius * sin(angle);

    // Create a new particle at the calculated position
    particles.push(new Particle1(x, y));
  }

      

  
}

function draw() {
 var yoff = 0;
  for (var y = 0; y < rows; y++) {
   var xoff = 0;
   for (var x = 0; x < cols; x++) {
    var index = x + y * cols;
    var angle = noise(xoff, yoff, zoff) * TWO_PI * 6;
    var v = p5.Vector.fromAngle(angle);
    v.setMag(1);
     flowfield[index] = v;
     xoff += inc;
     stroke(0, 50);
     //push();
     //translate(x * scl, y * scl);
     //rotate(v.heading());
     //strokeWeight(1);
     //line(0, 0, scl, 0);
     //pop();
   }
   yoff += inc;

   zoff += 0.0025;
 }

 for (var i = 0; i < particles.length; i++) {
   particles[i].follow(flowfield);
   particles[i].update();
   particles[i].edges();
   particles[i].show();
 }
 blendMode(MULTIPLY);
}