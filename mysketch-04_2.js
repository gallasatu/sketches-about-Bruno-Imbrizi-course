
const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');


const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const params = {
  cols: 20,
  rows: 20,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  frame: 0,
  animate: true,
  speed: 10
}

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
const cols = params.cols;
const rows = params.rows;
const numCells = cols * rows;

const gridWidth = width * 0.8;
const gridHeight = height * 0.8;
const marginWidth = (width - gridWidth) / 2;
const marginHeight = (height - gridHeight) / 2;
const cellWidth = gridWidth / cols;
const cellHeight = gridHeight / rows;

for (let i = 0; i < numCells; i++) {
  const col = i % cols;
  const row = Math.floor(i / cols);

  const f = params.animate ? frame : params.frame

  const n = random.noise3D(col * cellWidth, row * cellHeight, f * params.speed, params.freq);
  const angle = n * Math.PI * params.amp;
  const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

  context.save();
  context.translate(col * cellWidth, row * cellHeight);
  context.translate(cellWidth / 2, cellHeight / 2);
  context.translate(marginWidth, marginHeight);
  context.rotate(angle);
  context.lineWidth = scale;
  context.beginPath();
  context.moveTo(cellWidth * 0.8 * -0.5, 0);
  context.lineTo(cellWidth * 0.8 * 0.5, 0);
  context.stroke();
  context.restore();
}
  };
};


const createPane = () => {
  const pane = new Tweakpane.Pane();
  
  let folder 

    folder = pane.addFolder({
    title: 'Grid'});
    folder.addInput(params, 'cols', {min: 1, max: 50, step: 1});
    folder.addInput(params, 'rows', {min: 1, max: 50, step: 1});
    folder.addInput(params, 'scaleMin', {min: 1, max: 100});
    folder.addInput(params, 'scaleMax', {min: 1, max: 100});

    folder = pane.addFolder({
      title: 'Noise'});
      folder.addInput(params, 'freq', {min: -0.01, max: 0.01});
      folder.addInput(params, 'amp', {min: -1, max: 1});

    folder = pane.addFolder({
      title: 'Animation'});
      folder.addInput(params, 'animate');
      folder.addInput(params, 'frame', {min: 0, max: 100});
      folder.addInput(params, 'speed', {min: 1, max: 100});
    
    
    
  
};

createPane();

canvasSketch(sketch, settings);
