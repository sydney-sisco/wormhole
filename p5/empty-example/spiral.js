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
// const a = 1;
// const b = 0.2;
// const thetaMax = 4 * Math.PI; // Generates points for two full revolutions
// const step = 1; // The precision of the spiral

// const spiralPoints = generateLogarithmicSpiralPoints(a, b, thetaMax, step);

// console.log(spiralPoints);
