import { For } from "solid-js";
import { Waypoint } from "./canvas/logic/waypoint";

interface WaypointListProps {
  waypoints: Waypoint[];
}

export function WaypointList({ waypoints }: WaypointListProps) {
  return (
    <ul>
      <For each={waypoints}>
        {(waypoint, idx) => (
          <li>
            Waypoint {idx() + 1}: {Math.round(waypoint.x)},{" "}
            {Math.round(waypoint.y)}
          </li>
        )}
      </For>
    </ul>
  );
}
