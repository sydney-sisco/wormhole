function generateLogarithmicSpiralPoints(a, b, thetaMax, step) {
  const points = [];
  for (let theta = 0; theta < thetaMax; theta += step) {
    const r = a * Math.exp(b * theta);
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
    points.push({ x, y });
  }
  console.log(points);
  return points;
}

// Example usage:
const a = 1; // controls the starting point of the spiral
const b = 0.2; // controls the tightness of the spiral
const thetaMax = 4 * Math.PI; // the maximum angle to which you want to generate points, in radians
const step = 1; // the angular step between generated points

const spiralPoints = generateLogarithmicSpiralPoints(a, b, thetaMax, step);

console.log(spiralPoints);
