import { createEffect, createSignal, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import { runGuidedOpMode } from "./canvas/logic/opmode";
import { Robot, drawRobot, moveRobot } from "./canvas/logic/robot";
import { clearCanvas } from "./canvas/logic/utils";
import {
  Waypoint,
  drawLinesBetweenWaypoints,
  drawWaypoint,
  registerWaypointClickListener,
} from "./canvas/logic/waypoint";

const INITIAL_WAYPOINTS = [
  new Waypoint(100, 100),
  new Waypoint(100, 200),
  new Waypoint(150, 250),
];

function useWaypoints() {
  const [waypoints, setWaypoints] = createStore(INITIAL_WAYPOINTS);

  function addWaypoint(x: number, y: number) {
    setWaypoints((wp) => [...wp, new Waypoint(x, y)]);
  }

  function resetWaypoints() {
    setWaypoints([]);
  }

  return { waypoints, addWaypoint, resetWaypoints };
}

export function useController() {
  let robot = new Robot();
  const cleanupCallbacks: (() => void)[] = [];

  const [canvasRef, setCanvasRef] = createSignal<HTMLCanvasElement>();
  const { waypoints, addWaypoint, resetWaypoints } = useWaypoints();

  function drawLoop() {
    const canvas = canvasRef()!;

    clearCanvas(canvas);

    drawLinesBetweenWaypoints(canvas, waypoints);
    waypoints.forEach((wp) => {
      drawWaypoint(canvas, wp);
    });

    moveRobot(robot);
    drawRobot(canvas, robot);

    requestAnimationFrame(drawLoop);
  }

  createEffect(() => {
    const canvas = canvasRef();
    if (!canvas) {
      return;
    }
    requestAnimationFrame(drawLoop);
    cleanupCallbacks.push(registerWaypointClickListener(canvas, addWaypoint));
  });

  onCleanup(() => {
    cleanupCallbacks.forEach((cb) => cb());
  });

  function start() {
    runGuidedOpMode(robot);
  }

  function reset() {
    // Note: doesn't cancel async functions
    robot = new Robot();
    resetWaypoints();
  }

  return { setCanvasRef, start, reset };
}
