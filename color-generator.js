//IMG Generator

var fs = require('fs')
var trianglify = require('trianglify')

function hex (c) {
  var s = "0123456789abcdef";
  var i = parseInt (c);
  if (i == 0 || isNaN (c))
    return "00";
  i = Math.round (Math.min (Math.max (0, i), 255));
  return s.charAt ((i - i % 16) / 16) + s.charAt (i % 16);
}
  
/* Convert an RGB triplet to a hex string */
function convertToHex (rgb) {
  return '#' + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}
  
/* Remove '#' in color hex string */
function trim (s) { return (s.charAt(0) == '#') ? s.substring(1, 7) : s }
/* Convert a hex string to an RGB triplet */
function convertToRGB (hex) {
  var color = [];
  color[0] = parseInt ((trim(hex)).substring (0, 2), 16);
  color[1] = parseInt ((trim(hex)).substring (2, 4), 16);
  color[2] = parseInt ((trim(hex)).substring (4, 6), 16);
  return color;
}

function generateColor(colorStart,colorEnd,colorCount){

  // The beginning of your gradient
  var start = convertToRGB (colorStart);    

  // The end of your gradient
  var end   = convertToRGB (colorEnd);    

  // The number of colors to compute
  var len = colorCount;

  //Alpha blending amount
  var alpha = 0.0;

  var saida = [];

  for (i = 0; i < len; i++) {
    var c = [];
    alpha += (1.0/len);
    
    c[0] = start[0] * alpha + (1 - alpha) * end[0];
    c[1] = start[1] * alpha + (1 - alpha) * end[1];
    c[2] = start[2] * alpha + (1 - alpha) * end[2];

    saida.push(convertToHex (c));
    
  }
  return saida;
}

const toColorHexs = [];

for (let i = 0; i < 9; i++) {
  toColorHexs[i] = generateColor(trianglify.utils.colorbrewer.Blues[i], trianglify.utils.colorbrewer.Purples[i], 40);
}

let trueColor = [];

for (let i = 0; i < toColorHexs[0].length - 1; i++) {
  for (let j = 0; j < toColorHexs.length - 1; j++) {
    if (trueColor[i]) {
      trueColor[i].push(toColorHexs[j][i]);
    } else {
      trueColor[i] = [toColorHexs[j][i]]
    }
  }
}

for (let i = 0; i < trueColor.length; i++) {
  let canvas = trianglify({
    width: 1280,
    height: 720,
    xColors: trueColor[i],
    seed: 1
  }).toCanvas()
  let file = fs.createWriteStream('Images/Purple/' + (trueColor.length - i) + '.png')
  canvas.createPNGStream().pipe(file)
}
