// El vertex shader es responsable de transformar las coordenadas de los vértices y pasarlas al fragment shader.
const vertex_shader = `
#ifdef GL_ES
precision mediump float;
#endif

attribute vec4 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec2 vTexCoord;
varying float vFogDepth;

void main(void) {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aPosition;
  vTexCoord = aTexCoord;
  vFogDepth = -(uModelViewMatrix * aPosition).z;
}
`;

//El fragment shader aplica el efecto de niebla y textura a los fragmentos (píxeles).
const fragment_shader = `
#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;
varying float vFogDepth;

uniform sampler2D uTexture;
uniform vec4 uFogColor;
uniform float uFogNear;
uniform float uFogFar;

void main(void){
  vec4 textureColor = texture2D(uTexture, vTexCoord);
  float fogAmount = smoothstep(uFogNear, uFogFar, vFogDepth/8000.0);
  gl_FragColor = mix(textureColor, uFogColor, fogAmount); 
}
`;

//variables globales
let canvas;
let texture_img;
let boxes = [];
let slider_far, slider_far_label, slider_near, slider_near_label;
let fog = {
  r: 204,
  g: 230,
  b: 255,
}
let fog_shader;

function preload() {
  texture_img = loadImage('https://webglfundamentals.org/webgl/resources/f-texture.png');
}

//para las boxes:
let x = -400, y = 0, z = 100, rot = 0.0;

function setup() {
  createCanvas(1400, 900, WEBGL);
  // textureMode(NORMAL);
  fog_shader = createShader(vertex_shader, fragment_shader);

  slider_near = createSlider(0, 1000, 100, 1); //valor inicial, valor mínimo, valor máximo, incremento
  slider_near.position(10, 10);
  slider_near.style('width', '200px');
  slider_near_label = createSpan('Fog Near');
  slider_near_label.position(220, 10);

  slider_far = createSlider(0, 1000, 800, 1);
  slider_far.position(10, 40);
  slider_far.style('width', '200px');
  slider_far_label = createSpan('Fog Far');
  slider_far_label.position(220, 40);
  
  

  for (let i = 0; i < 10; i++) {
    boxes.push(new Box(x, y, z, rot, rot, rot));
    x += 150, z -= 50, rot += 0.05;
  }

}

function draw() {
  orbitControl();
  background(fog.r, fog.g, fog.b, 255); //color de fondo de la niebla (RGBA) 
  
  fog_shader.setUniform('uTexture', texture_img);
  for (let box of boxes) {
    box.draw();
  }

  shader(fog_shader);
  fog_shader.setUniform('uFogColor', [fog.r / 255, fog.g / 255, fog.b / 255, 1.0]);
  fog_shader.setUniform('uFogNear', slider_near.value()/1000);
  fog_shader.setUniform('uFogFar', slider_far.value()/1000);
  for (let box of boxes) {
    box.draw();
  }
}


















