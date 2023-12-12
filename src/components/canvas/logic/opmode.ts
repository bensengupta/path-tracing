import { Robot } from "./robot";
import { sleep } from "./utils";

export async function runGuidedOpMode(robot: Robot) {
  robot.angularPower = 1;
  await sleep(530);
  robot.angularPower = 0;
  robot.forwardPower = 1;
  await sleep(300);
  robot.forwardPower = 0;
  robot.sidewaysPower = -1;
  await sleep(300);
  robot.sidewaysPower = 0;
  robot.angularPower = -1;
  await sleep(530);

  robot.forwardPower = 0;
  robot.angularPower = 0;
  robot.sidewaysPower = 0;
}
