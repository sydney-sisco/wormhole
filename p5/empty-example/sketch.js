let rows = 21;
let cols = 21;

let radiusSlider;
const startingRadius = 2.5;
let circlesSlider;
const startingCircles = 25;
let spiralStartSlider;
const initialSpiralStart = 1;
let spiralStepSlider;
const spiralStep = 0.4;
let spiralTightnessSlider;
const spiralTightness = 0.4;
let spiralThetaMaxSlider;
const initialspiralThetaMax = 4 * Math.PI;

// fn to draw a grid across the entire canvas
function drawGrid(rows, cols) {
  let cellWidth = width / cols;
  let cellHeight = cellWidth

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = j * cellWidth;
      let y = i * cellHeight;
      stroke(0);
      fill(255);
      rect(x, y, cellWidth, cellHeight);
    }
  }
}


// fn to draw a circle
function drawCircles(centerPoints) {
  stroke(0);
  noFill();
  let r = radiusSlider.value();
  let n = circlesSlider.value();

  for (let i = 0; i < n; i++) {
    let x = (windowWidth / 2) + centerPoints[i].x;
    let y = (windowWidth / 2) + centerPoints[i].y;

    circle(x, y, i ** r);
  }
}

// fn that accepts an array of points and plots them
function plotPoints(points, translateX = windowWidth / 2, translateY = windowWidth / 2) {

  translate(translateX, translateY);

  stroke('green');
  noFill();
  beginShape();
  for (let i = 0; i < points.length; i++) {
    vertex(points[i].x, points[i].y);
  }
  endShape();

  translate(-translateX, -translateY);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  radiusSlider = createSlider(0, 10, startingRadius, 0);
  radiusSlider.position(width-200, height - 100);

  circlesSlider = createSlider(1, 100, startingCircles);
  circlesSlider.position(width - 200, height - 50);

  spiralStepSlider = createSlider(0.01, Math.PI, spiralStep, 0);
  spiralStepSlider.position(width - 400, height - 100);

  spiralTightnessSlider = createSlider(0.01, 1, spiralTightness, 0);
  spiralTightnessSlider.position(width - 400, height - 50);

  spiralStartSlider = createSlider(0, 10, initialSpiralStart);
  spiralStartSlider.position(width - 600, height - 100);

  spiralThetaMaxSlider = createSlider(0, 10 * Math.PI, initialspiralThetaMax);
  spiralThetaMaxSlider.position(width - 600, height - 50);
}

function draw() {
  background(255);

  drawGrid(rows, cols);



  const a = spiralStartSlider.value();
  const b = spiralTightnessSlider.value();
  const thetaMax = 16 * Math.PI;
  const step = spiralStepSlider.value();
  const points = generateLogarithmicSpiralPoints(a, b, thetaMax, step);

  plotPoints(points);
  
  // drawCircles(points);
  

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
