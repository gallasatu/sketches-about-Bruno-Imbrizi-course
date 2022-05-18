const canvasSketch = require('canvas-sketch');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true,
};

const params = {
      min : 0,
      max : 10,
      }

const sketch = () => {
  return ({ context, width, height, frame }) => {
    // context.fillStyle = 'white';

    const w = width * 0.5;
    const h = height * 0.5;

    const gradient = context.createRadialGradient(w, h, params.min, w, h, params.max);
    gradient.addColorStop(0, '#ff8533');
    gradient.addColorStop(1, '#ff00bf');
    context.fillStyle = gradient;
  
    context.fillRect(0, 0, width, height);

    
  
  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane();

  let folder

    folder = pane.addFolder({
      title: 'Gradient'});
    folder.addInput(params, 'min', {min: 1, max: 1000, step: 1});
    folder.addInput(params, 'max', {min: 10, max: 1000, step: 1});

  };

createPane();

canvasSketch(sketch, settings);
