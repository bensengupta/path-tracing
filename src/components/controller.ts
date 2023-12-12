import { createEffect, createSignal, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import { runGuidedOpMode } from "./canvas/logic/opmode";
import { DEFAULT_ROBOT } from "./canvas/logic/robot";
import { Waypoint } from "./canvas/logic/waypoint";
import { initScene } from "./canvas/logic/main";

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
    setWaypoints(INITIAL_WAYPOINTS);
  }

  return { waypoints, addWaypoint, resetWaypoints };
}

export function useController() {
  const robot = { ...DEFAULT_ROBOT };
  let cleanupCallback = () => {};

  const [canvasRef, setCanvasRef] = createSignal<HTMLCanvasElement>();
  const { waypoints, addWaypoint, resetWaypoints } = useWaypoints();

  createEffect(() => {
    const canvas = canvasRef();
    if (!canvas) {
      return;
    }
    cleanupCallback = initScene(canvas, robot, waypoints, addWaypoint);
  });

  onCleanup(cleanupCallback);

  function start() {
    runGuidedOpMode(robot, waypoints);
  }

  function reset() {
    // Note: doesn't cancel async functions
    robot.x = DEFAULT_ROBOT.x;
    robot.y = DEFAULT_ROBOT.y;
    robot.heading = DEFAULT_ROBOT.heading;
    resetWaypoints();
  }

  return { setCanvasRef, waypoints, start, reset };
}
