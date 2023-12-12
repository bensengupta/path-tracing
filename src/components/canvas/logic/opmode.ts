import { Robot } from "./robot";
import { sleep } from "./utils";
import { Waypoint } from "./waypoint";

export async function runGuidedOpMode(robot: Robot, waypoints: Waypoint[]) {
  let stop = false;

  robot.angularPower = 1;
  await sleep(530);
  if (stop) return;
  robot.angularPower = 0;
  robot.forwardPower = 1;
  await sleep(300);
  if (stop) return;
  robot.forwardPower = 0;
  robot.sidewaysPower = -1;
  await sleep(300);
  if (stop) return;
  robot.sidewaysPower = 0;
  robot.angularPower = -1;
  await sleep(530);
  if (stop) return;

  robot.forwardPower = 0;
  robot.angularPower = 0;
  robot.sidewaysPower = 0;

  return function unsub() {
    stop = true;
  };
}
