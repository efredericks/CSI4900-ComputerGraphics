/*
face.js
Erik Fredericks, c/o Ed Angel

Face drawing
*/

// Global variables we'll need
var gl;
var points;
var vertices;

// This function executes our WebGL code AFTER the window is loaded.
// Meaning, that we wait for our canvas element to exist.
window.onload = function init() {
  // Grab the canvas object and initialize it
  var canvas = document.getElementById('gl-canvas');
  gl = WebGLUtils.setupWebGL(canvas);

  // Error checking
  if (!gl) { alert('WebGL unavailable'); }

  // triangle vertices
  // vertices = [
  //   vec2(0, 0), //center
  //   vec2(-0.75, 0),
  //   vec2(-0.55,0.55),
  //   vec2(0,0.75),
  //   vec2(0.55,0.55),
  //   vec2(0.75, 0),
  //   vec2(0.55,-0.55),
  //   vec2(0,-0.75),
  //   vec2(-0.55,-0.55),
  //   vec2(-0.75, 0),
  // ];

  // circle
  vertices = [];
  let step = Math.PI / 256;
  let r = 0.75;
  for (let theta = 0; theta < 2 * Math.PI; theta+=step) {
    let _x = r * Math.cos(theta);
    let _y = r * Math.sin(theta);
    vertices.push(vec2(_x, _y));
  }

  // configure WebGL
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  // load shaders and initialize attribute buffers
  var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
  gl.useProgram(program);

  // load data into GPU
  var bufferID = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  // set its position and render it
  var vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);
  render();
};

// Render whatever is in our gl variable
function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length);
}
