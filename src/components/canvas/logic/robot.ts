import { REFERENCE_CANVAS_SIZE, ROBOT_SIZE } from "./constants";
import { DEG_TO_RAD, Matrix3, Point, clamp, clampAngle } from "./math";

export interface Robot {
  x: number;
  y: number;
  heading: number;

  vx: number;
  vy: number;
  vh: number;

  forwardPower: number;
  sidewaysPower: number;
  angularPower: number;
}

export const DEFAULT_ROBOT: Readonly<Robot> = {
  x: 100,
  y: 100,
  heading: 0,
  vx: 8,
  vy: 12,
  vh: 6 * DEG_TO_RAD,
  forwardPower: 0,
  sidewaysPower: 0,
  angularPower: 0,
};

export function moveRobot(robot: Robot) {
  robot.heading += clampAngle(robot.angularPower * robot.vh);

  const yComponent = -robot.forwardPower * robot.vy;
  const xComponent = robot.sidewaysPower * robot.vx;

  robot.x = clamp(
    robot.x +
      xComponent * Math.cos(robot.heading) -
      yComponent * Math.sin(robot.heading),
    0,
    REFERENCE_CANVAS_SIZE,
  );
  robot.y = clamp(
    robot.y +
      yComponent * Math.cos(robot.heading) +
      xComponent * Math.sin(robot.heading),
    0,
    REFERENCE_CANVAS_SIZE,
  );
}

export function drawRobot(canvas: HTMLCanvasElement, robot: Robot) {
  const scaleFactor = canvas.height / REFERENCE_CANVAS_SIZE;

  const transform = Matrix3.identity()
    .multiplyMatrix(Matrix3.scale(scaleFactor, scaleFactor))
    .multiplyMatrix(Matrix3.translate(robot.x, robot.y))
    .multiplyMatrix(Matrix3.rotate(robot.heading));

  const ctx = canvas.getContext("2d")!;
  const halfSize = ROBOT_SIZE / 2;
  const topLeftPoint = Point.origin()
    .transform(Matrix3.translate(-halfSize, -halfSize))
    .transform(transform);
  const topRightPoint = Point.origin()
    .transform(Matrix3.translate(halfSize, -halfSize))
    .transform(transform);
  const bottomRightPoint = Point.origin()
    .transform(Matrix3.translate(halfSize, halfSize))
    .transform(transform);
  const bottomLeftPoint = Point.origin()
    .transform(Matrix3.translate(-halfSize, halfSize))
    .transform(transform);

  // square
  ctx.beginPath();
  ctx.moveTo(topLeftPoint.x, topLeftPoint.y);
  ctx.lineTo(topRightPoint.x, topRightPoint.y);
  ctx.lineTo(bottomRightPoint.x, bottomRightPoint.y);
  ctx.lineTo(bottomLeftPoint.x, bottomLeftPoint.y);
  ctx.fillStyle = "gray";
  ctx.fill();

  const topMiddlePoint = Point.origin()
    .transform(Matrix3.translate(0, -halfSize))
    .transform(transform);
  const leftMiddlePoint = Point.origin()
    .transform(Matrix3.translate(-halfSize, 0))
    .transform(transform);
  const rightMiddlePoint = Point.origin()
    .transform(Matrix3.translate(halfSize, 0))
    .transform(transform);

  // triangle
  ctx.beginPath();
  ctx.moveTo(topMiddlePoint.x, topMiddlePoint.y);
  ctx.lineTo(leftMiddlePoint.x, leftMiddlePoint.y);
  ctx.lineTo(rightMiddlePoint.x, rightMiddlePoint.y);
  ctx.fillStyle = "orange";
  ctx.fill();
}
