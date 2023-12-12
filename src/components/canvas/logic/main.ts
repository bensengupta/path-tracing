import { FRAME_DURATION } from "./constants";
import { Robot, drawRobot, moveRobot } from "./robot";
import { clearCanvas } from "./utils";
import {
  Waypoint,
  drawLinesBetweenWaypoints,
  drawWaypoints,
  registerWaypointClickListener,
} from "./waypoint";

export function initScene(
  canvas: HTMLCanvasElement,
  robot: Robot,
  waypoints: Waypoint[],
  addWaypoint: (x: number, y: number) => void,
) {
  let stop = false;

  function drawLoop() {
    clearCanvas(canvas);

    drawLinesBetweenWaypoints(canvas, waypoints);
    drawWaypoints(canvas, waypoints);
    drawRobot(canvas, robot);

    if (stop) {
      return;
    }
    requestAnimationFrame(drawLoop);
  }

  function tick() {
    moveRobot(robot);
    setTimeout(tick, FRAME_DURATION);
  }

  requestAnimationFrame(drawLoop);
  tick();

  const unsub = registerWaypointClickListener(canvas, addWaypoint);

  return function cleanup() {
    stop = true;
    unsub();
  };
}
