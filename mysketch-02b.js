const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  // animate: true
};

const degToRad = (deg) => {
      return deg / 180 * Math.PI};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    const num = 80;
    const radius = width * 0.25;
    const cx = width  * 0.5;
    const cy = height * 0.5;


    for (let i = 0; i < num; i++) {

    const slice = degToRad(360 / num);
    const angle = slice * i;
    
    let x = cx + radius * Math.sin(angle);
    let y = cy + radius * Math.cos(angle);
    
    const w = width  * random.range(0.005, 0.01);
    const h = height * 0.2;

    context.save();
    context.translate(x, y);
    context.rotate(-angle);

    context.beginPath();
    context.rect(-w * 0.5, -h * 0.5, w, h * random.range(0.5, 1.5));
    context.fill();
    context.restore();

    context.save();
    context.translate(cx, cy);
    context.rotate(-angle);

    context.lineWidth = random.range(5, 20);
    context.beginPath();
    context.arc(0,0, radius * random.range(0.4, 1.8), slice * random.range(1, -3), slice * random.range(1, 5));
    context.stroke();
    context.restore();
    
    }
  };
};

canvasSketch(sketch, settings);
