var initialPosition = 160,               // px
    initialVelocity = 0,                 // px/second
    initialTime = (Date.now() / 1000),   // seconds
    acceleration = -1000,                // px/second^2

    // this is either the initial height or the ground height
    referencePosition = initialPosition,

    // this is either the initial velocity or rebound velocity
    referenceVelocity = initialVelocity,

    // this is either the initial time or time at the ground
    referenceTime = initialTime,    reboundVelocity,
    reboundVelocitySquared,
    elapsedTime,
    currentPosition;

function setup() {
  createCanvas(66, 226);
  fill('#EC245E');
  noStroke();
}

function draw() {
  elapsedTime = (Date.now() / 1000) - referenceTime; // seconds

  // Kinematic Equation 1
  //   d = Vi*t + (1/2)a*t^2
  distance = referenceVelocity * elapsedTime +
             0.5 * acceleration * Math.pow(elapsedTime, 2);
  currentPosition = referencePosition + distance;

  if (currentPosition < 0 ) {
    // This animation doesn't account for bounce decay
    // so we can save processing by only calculating
    // the return velocity on the first bounce.
    if (!reboundVelocity) {

      // Kinematic Equation 2
      //   Vf^2 = Vi^2 + 2*a*d
      reboundVelocitySquared = Math.pow(initialVelocity, 2) +
                               2 * acceleration * initialPosition;

      // The Math.abs reverses the ball direction
      // while preventing imaginary numbers.
      reboundVelocity = Math.sqrt(Math.abs(reboundVelocitySquared));
      referenceVelocity = reboundVelocity;
    }

    // Reset initial states.
    currentPosition = 0;
    referencePosition = 0; // Our new initial position.
    referenceTime = Date.now() / 1000; // Our new initial time.
  }

  // Draw the ball
  translatedPos = initialPosition - currentPosition;
  clear();
  ellipse(33, 33 + translatedPos, 50);
}
