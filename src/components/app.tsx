import { Canvas } from "./canvas/canvas";
import { useController } from "./controller";
import { Controls } from "./controls";

export function App() {
  const { setCanvasRef, start, reset } = useController();

  return (
    <div class="flex h-screen flex-col gap-8 p-8">
      <h1>Sim</h1>
      <div class="grid h-full grid-cols-2 gap-8">
        <Canvas setCanvasRef={setCanvasRef} />
        <Controls onClickStart={start} onClickReset={reset} />
      </div>
    </div>
  );
}
