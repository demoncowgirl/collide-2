const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    // x: innerWidth / 2,
    // y: innerHeight / 2
    x: 10,
    y: 10
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', function(event){
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', function(event){
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2){
  var xDistance = x2 - x1; //gets horizontal distance
  var yDistance = y2 - y1; //gets vertical distance

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

}

// Objects
function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.update = function() {
        this.draw();
    };

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath();
    };
}

// Implementation
var particles;

function init() {
  particles = [];

  for(var i=0; i<4; i++){
    const radius = 80;
    var x = randomIntFromRange(radius, canvas.width - radius);
    var y = randomIntFromRange(radius, canvas.height - radius);

    const color = 'blue';

    if (i != 0){
      for (var j =0; j < particles.length; j++){
        if(distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0){
          x = randomIntFromRange(radius, canvas.width - radius);
          y = randomIntFromRange(radius, canvas.height - radius);

          j = -1; //to start loop over again
        }
      }
    }

    particles.push(new Particle(x, y, radius, color))
  }

  console.log(particles);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle=>{
      particle.update();
    });
}

init();
animate();
