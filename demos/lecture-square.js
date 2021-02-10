var gl;
var points;

window.onload = function init(){
  var canvas = document.getElementById('gl-canvas');
  gl = WebGLUtils.setupWebGL( canvas );
  if ( !gl ) { alert('WebGL is not available'); }

  // Four vertices
  var vertices = [
    vec2( -0.5, -0.5 ),
    vec2( -0.5,  0.5 ),
    vec2(  0.5,  0.5 ),
    vec2(  0.5, -0.5)

    // square for TRIANGLES
    //vec2(-0.5,-0.5),
    //vec2(0.5, 0.5),
    //vec2(0.5,-0.5)
    
  ];

  // Configure WebGL
  gl.viewport( 0, 0, canvas.width, canvas.height);
  gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

  // Load shaders and initialize attribute buffers
  var program = initShaders( gl, "vertex-shader", "fragment-shader" );
  gl.useProgram( program );

  // Load data into GPU
  var bufferID = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, bufferID );
  gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

  // Associate shader variables with data buffer
  var vPosition = gl.getAttribLocation( program, "vPosition" );
  gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray( vPosition );

  render();
};

function render() {
  gl.clear( gl.COLOR_BUFFER_BIT );

// uncomment one of these to see behavior
//  gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
//  gl.drawArrays( gl.TRIANGLES, 0, 6 );
//  gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

  gl.drawArrays(gl.LINE_STRIP, 0, 4);
}
