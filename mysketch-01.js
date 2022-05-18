const canvasSketch = require('canvas-sketch');
const { drawSVGPath } = require('canvas-sketch-util/penplot');
const random = require('canvas-sketch-util/random');


const settings = {
  dimensions: [ 1080, 1080 ],
  // animate: true
};

const sketch = () => {
  return ({ context, width, height, frame}) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';
    ;

    const num = height;

    for (let i = 0; i < num; i += random.range(10, 100)) {
      
  
      let x = 0.5 * width;
      let y = i;
      
      const n = random.noise3D(x, y, frame * 0.001);

      const draw = () => {

      console.log(frame);
      context.save();
      context.beginPath();
      context.translate(x, y);
      context.lineWidth = 5;
      context.arc( 0, 0, 10, 0, Math.PI * 2);
      context.fill();
      context.restore();
      }
    }
  };
};

canvasSketch(sketch, settings);
