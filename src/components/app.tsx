import { Canvas } from "./canvas/canvas";
import { useController } from "./controller";
import { Controls } from "./controls";
import { WaypointList } from "./waypoint-list";

export function App() {
  const { setCanvasRef, start, reset, waypoints } = useController();

  return (
    <div class="flex h-screen flex-col gap-8 p-8">
      <h1>Sim</h1>
      <div class="grid h-full grid-cols-2 gap-8">
        <Canvas setCanvasRef={setCanvasRef} />
        <div class="flex flex-col gap-8">
          <Controls onClickStart={start} onClickReset={reset} />
          <WaypointList waypoints={waypoints} />
        </div>
      </div>
    </div>
  );
}
