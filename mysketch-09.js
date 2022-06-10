const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};


let text = 'Y';
let fontSize = 1200;
const fontFamily = 'sans-serif';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');




const sketch = ({ context, width, height }) => {


  

  
    const cell = 20;
    const cols = Math.floor(width / cell);
    const rows = Math.floor(height / cell);

    const cellNum = cols * rows;

    typeCanvas.width = cols;
    typeCanvas.height = rows;

  return ({ context, width, height }) => {
    // typeContext.fillStyle = 'black';
    // typeContext.fillRect(0, 0, cols, rows);

    fontSize = cols;

    // typeContext.fillStyle = 'black';

    // typeContext.font = `${fontSize}px ${fontFamily}`;

    // typeContext.textBaseline = 'top';

    

    // const metrics = typeContext.measureText(text);
    // console.log(metrics)
    // const mx = metrics.actualBoundingBoxLeft * -1;
    // const my = metrics.actualBoundingBoxAscent * -1;
    // const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    // const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    
    // const tx = (cols - mw) * 0.5 - mx;
    // const ty = (rows - mh) * 0.5 - my;
    
    // typeContext.save();
    // typeContext.translate(tx, ty);
    // typeContext.beginPath();
    // typeContext.rect(mx, my, mw, mh);
    // typeContext.fill();

    // typeContext.restore();

    
    
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    context.font = `${cell * 2}px ${fontFamily}`;
    
    context.textBaseline = 'middle';
    context.textAlign = 'center';

    

    let img = new Image();
    img.src = 'obaz.jpeg';
    img.onload = function() {
      typeContext.drawImage(img, 0, 0, cols, rows);
      const typeData = typeContext.getImageData(0, 0, cols, rows).data;
      
      console.log(typeData)

      for (let i = 0; i < cellNum; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        x = col * cell;
        y = row * cell;

        const r = typeData[i * 4 + 0];
        const g = typeData[i * 4 + 1];
        const b = typeData[i * 4 + 2];
        const a = typeData[i * 4 + 3];
        
        context.fillStyle = 'white';
        
        const glyph = getGlyph(r);
        context.font = `${30}px ${fontFamily}`;
       

     

        context.save();
        context.translate(x, y);
        context.translate(cell * 0.5, cell * 0.5)
        context.fillText(glyph, 0, 0);
        // context.beginPath();
        // context.arc(0, 0, cell * 0.5, 0, Math.PI * 2);
        // context.fill();
        context.restore();
    };
    
    }

  };
};
const getGlyph = (v) => {
  if (v < 50) return 'I';
  if (v < 100) return '.';
  if (v < 150) return '/';
  if (v < 200) return '-';

  return '=';

  // const glyphs = 'I-~_ox'.split('');
  // return random.pick(glyphs);
}

canvasSketch(sketch, settings);


// const onKeyUp = (e) => {
//   text = e.key.toUpperCase();
//   manager.render();
// };





// const loadMeSomeImage = (url) => {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.onload = () => resolve(img);
//     img.onerror = () => reject();
//     img.src = url
//     context.drawImage(img, 0, 0);
//   });
// };

// document.addEventListener('keyup', onKeyUp)

// const start = async () => {
//   manager = await canvasSketch(sketch, settings);}

// start();

