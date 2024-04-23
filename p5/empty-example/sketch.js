let rows = 21;
let cols = 21;
let spiralCanvasWidth = 800;
let spiralCanvasHeight = 800;

let radiusSlider;
const startingRadius = 2.5;
let circlesSlider;
const startingCircles = 25;

let spiralStartSlider;
const initialSpiralStart = 1;
let spiralStepSlider;
const spiralStep = 1;
let spiralTightnessSlider;
const spiralTightness = 0.2;
let spiralThetaMaxSlider;
const initialspiralThetaMax = 4 * Math.PI;


// fn to draw a grid across the entire canvas
function drawGrid(rows, cols, width, height) {
  let cellWidth = width / cols;
  let cellHeight = height / rows;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = j * cellWidth;
      let y = i * cellHeight;
      stroke(255);
      fill(0);
      strokeWeight(0.1);
      rect(x, y, cellWidth, cellHeight);
    }
  }
}


// fn to draw a circle
function drawCircles(centerPoints) {
  stroke(255);
  strokeWeight(1);
  noFill();
  let r = radiusSlider.value();
  let n = Math.min(circlesSlider.value(), centerPoints.length);

  for (let i = 0; i < n; i++) {
    let x = (spiralCanvasWidth / 2) + centerPoints[i].x;
    let y = (spiralCanvasHeight / 2) + centerPoints[i].y;
    strokeWeight(2 * i / n)
    circle(x, y, i ** r);
  }
}

// fn that accepts an array of points and plots them
function plotPoints(points, translateX = spiralCanvasWidth / 2, translateY = spiralCanvasHeight / 2) {

  translate(translateX, translateY);

  stroke('green');
  noFill();
  beginShape();
  strokeWeight(1);
  for (let i = 0; i < points.length; i++) {
    vertex(points[i].x, points[i].y);
  }
  endShape();

  translate(-translateX, -translateY);
}

function storeData(e){
  console.log(e);
  console.log(e.target.value);
  // storeItem(key, value);
}

// function createSlider

function setup() {
  createCanvas(windowWidth, windowHeight);

  radiusSlider = createSlider(0, 10, startingRadius, 0);
  radiusSlider.position(width-200, height - 100);
  radiusSlider.changed(storeData);

  circlesSlider = createSlider(1, 100, startingCircles);
  circlesSlider.position(width - 200, height - 50);
  circlesSlider.changed(storeData);

  spiralStepSlider = createSlider(0.01, Math.PI, spiralStep, 0);
  spiralStepSlider.position(width - 400, height - 100);
  spiralStepSlider.changed(storeData);

  spiralTightnessSlider = createSlider(0.01, 1, spiralTightness, 0);
  spiralTightnessSlider.position(width - 400, height - 50);
  spiralTightnessSlider.changed(storeData);

  spiralStartSlider = createSlider(0, 10, initialSpiralStart);
  spiralStartSlider.position(width - 600, height - 100);
  spiralStartSlider.changed(storeData);

  spiralThetaMaxSlider = createSlider(0, 10 * Math.PI, initialspiralThetaMax);
  spiralThetaMaxSlider.position(width - 600, height - 50);
  spiralThetaMaxSlider.changed(storeData);


  // Stop the draw loop
  noLoop();

  // Add an input event listener to the slider
  radiusSlider.input(() => redraw());
  circlesSlider.input(() => redraw());
  spiralStepSlider.input(() => redraw());
  spiralTightnessSlider.input(() => redraw());
  spiralStartSlider.input(() => redraw());
  spiralThetaMaxSlider.input(() => redraw());

}

// draw spiralCanvas
function drawSpiralCanvas() {
  rect(0, 0, 800, 800);
}

function draw() {
  background(255);

  drawSpiralCanvas();

  drawGrid(rows, cols, 800, 800);

  const a = spiralStartSlider.value();
  const b = spiralTightnessSlider.value();
  const thetaMax = spiralThetaMaxSlider.value();
  const step = spiralStepSlider.value();
  const points = generateLogarithmicSpiralPoints(a, b, thetaMax, step);

  stroke(0);
  fill(0);

  plotPoints(points);
  
  drawCircles(points);


  print_info();
  print_debug();
}

const print_info = () => {

  fill('skyblue');
  rect(0, windowWidth, width, windowHeight - windowWidth);

  stroke(0);
  strokeWeight(1);
  fill(0);
  text(`radius: ${radiusSlider.value()}`, width - 200, height - 100);
  text(`circles: ${circlesSlider.value()}`, width - 200, height - 50);

  text(`spiral step: ${spiralStepSlider.value()}`, width - 400, height - 100);
  text(`spiral tightness: ${spiralTightnessSlider.value()}`, width - 400, height - 50);
  text(`spiral start: ${spiralStartSlider.value()}`, width - 600, height - 100);
  text(`spiral thetaMax: ${spiralThetaMaxSlider.value()}`, width - 600, height - 50);
}

const print_debug = () => {
  stroke(0);
  strokeWeight(1);
  fill(0);
  textSize(12);
  text(`x: ${mouseX}, y: ${mouseY}`, 10, height - 30);
  
  // print grid location
  let cellWidth = width / cols;
  let cellHeight = cellWidth
  let gridX = floor(mouseX / cellWidth);
  let gridY = floor(mouseY / cellHeight);
  text(`gridX: ${gridX}, gridY: ${gridY}`, 10, height - 10);
}
