import {
  REFERENCE_CANVAS_SIZE,
  WAYPOINT_COLOR,
  WAYPOINT_LINE_COLOR,
  WAYPOINT_RADIUS,
} from "./constants";
import { Matrix3, Point } from "./math";

export class Waypoint {
  reached = false;

  constructor(
    public x: number,
    public y: number,
  ) {}
}

function drawWaypoint(canvas: HTMLCanvasElement, waypoint: Waypoint) {
  const scaleFactor = canvas.height / REFERENCE_CANVAS_SIZE;

  const transform = Matrix3.identity()
    .multiplyMatrix(Matrix3.scale(scaleFactor, scaleFactor))
    .multiplyMatrix(Matrix3.translate(waypoint.x, waypoint.y));

  const ctx = canvas.getContext("2d")!;

  const centerPoint = Point.origin().transform(transform);
  const radius = WAYPOINT_RADIUS * scaleFactor;

  ctx.beginPath();
  ctx.arc(centerPoint.x, centerPoint.y, radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = WAYPOINT_COLOR;
  ctx.fill();
}

export function drawWaypoints(
  canvas: HTMLCanvasElement,
  waypoints: Waypoint[],
) {
  waypoints.forEach((wp) => drawWaypoint(canvas, wp));
}

function drawLineBetweenTwoWaypoints(
  canvas: HTMLCanvasElement,
  waypoint1: Waypoint,
  waypoint2: Waypoint,
) {
  const scaleFactor = canvas.height / REFERENCE_CANVAS_SIZE;

  const transform = Matrix3.identity().multiplyMatrix(
    Matrix3.scale(scaleFactor, scaleFactor),
  );

  const ctx = canvas.getContext("2d")!;

  const p1 = Point.origin()
    .transform(Matrix3.translate(waypoint1.x, waypoint1.y))
    .transform(transform);

  const p2 = Point.origin()
    .transform(Matrix3.translate(waypoint2.x, waypoint2.y))
    .transform(transform);

  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.strokeStyle = WAYPOINT_LINE_COLOR;
  ctx.stroke();
}

export function drawLinesBetweenWaypoints(
  canvas: HTMLCanvasElement,
  waypoints: Waypoint[],
) {
  for (let i = 0; i < waypoints.length - 1; i++) {
    drawLineBetweenTwoWaypoints(canvas, waypoints[i], waypoints[i + 1]);
  }
}

export function registerWaypointClickListener(
  canvas: HTMLCanvasElement,
  onClickCanvas: (x: number, y: number) => void,
) {
  function waypointClickListener(event: MouseEvent) {
    const scaleFactor = REFERENCE_CANVAS_SIZE / canvas.height;
    onClickCanvas(event.offsetX * scaleFactor, event.offsetY * scaleFactor);
  }

  canvas.addEventListener("click", waypointClickListener);

  return function unsubscribe() {
    canvas.removeEventListener("click", waypointClickListener);
  };
}
