const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const sketch = (context, width, height) => {

   let point = new Point(102, 102);



  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);


    point.move();
    point.draw(context);
    point.bounce(width, height);
   
}
  };

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Point {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-3, 3), random.range(-3, 3));
}

  move() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  bounce(width, height) {
    if (this.pos.x >= width -101 || this.pos.x <= 101) this.vel.x *= -1
    if (this.pos.y >= height -101 || this.pos.y <= 101) this.vel.y *= -1
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.fillStyle = 'black';
    context.lineWidth = 4
    context.beginPath();
    context.arc(0, 0, 100, 0, Math.PI *2);
    context.stroke();
    context.restore();  
  }
}