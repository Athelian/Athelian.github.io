// Basic command-line example
// Usage: node save-as-png.js
var fs = require('fs')
var trianglify = require('trianglify')

// Generate a pattern and then grab the PNG data uri


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
  
  // Exemplo de como usar
  
  var tmp = generateColor(trianglify.utils.colorbrewer.Blues[0],'#ff0ff0',10);
  
  const toPinkHexs = [];
  for (let i = 0; i < 9; i++) {
  toPinkHexs[i] = generateColor(trianglify.utils.colorbrewer.Blues[i], trianglify.utils.colorbrewer.PuRd[i], 20);
  }
  let truePink = [];
  for (let j = 0; j < toPinkHexs[0].length - 1; j++) {
  for (let i = 0; i < toPinkHexs.length - 1; i++) {
    if (truePink[j]) {
      truePink[j].push(toPinkHexs[i][j]);
    } else {
      truePink[j] = [toPinkHexs[i][j]]
    }
  }
  }
  
  let quickImages = []
  
  function changeBackground (colors, count) {
  if (count > colors.length - 1) {
    return;
  }
  
  let pattern = trianglify({
      width: 660,
      height: 1461,
      seed: 1,
      xColors: colors[count]
  })
  let dataUrl = pattern.toCanvas().toDataURL()
  quickImages.push(dataUrl);
  const file = fs.createWriteStream('trianglify.png' + count)
  pattern.toCanvas().createPNGStream().pipe(file)
  // document.getElementById('bg').style.backgroundImage = '';
  // document.getElementById('bg').style.backgroundImage = 'url('+dataUrl+')';
  changeBackground(colors, ++count);
  }
  // changeBackground(truePink, 0);

  //console.log(truePink[0])
  // let a = trianglify()
  // console.log(trianglify().opts.palette.Blues);

  // let a = trianglify().opts.palette.Blues


  console.log(truePink);

  for (let i = 0; i < truePink.length; i++) {
    let canvas = trianglify({
      width: 1920,
      height: 1080,
      xColors: truePink[i],
      seed: 1
    }).toCanvas()
    let file = fs.createWriteStream('images/' + i + '.png')
    canvas.createPNGStream().pipe(file)
  }

// Save the buffer to a file. See the node-canvas docs for a full
// list of all the things you can do with this Canvas object:
// https://github.com/Automattic/node-canvas
