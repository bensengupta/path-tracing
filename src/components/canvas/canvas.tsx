import { onCleanup, onMount } from "solid-js";

interface CanvasProps {
  setCanvasRef?: (el: HTMLCanvasElement) => void;
}

export function Canvas({ setCanvasRef }: CanvasProps) {
  let canvasRef: HTMLCanvasElement | undefined;
  let containerRef: HTMLDivElement | undefined;

  function resizeCanvas() {
    const size = Math.min(
      containerRef!.clientWidth,
      containerRef!.clientHeight,
    );
    canvasRef!.width = size;
    canvasRef!.height = size;
  }

  onMount(() => {
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
  });

  onCleanup(() => {
    window.removeEventListener("resize", resizeCanvas);
  });

  return (
    <div ref={containerRef} class="relative h-full w-full">
      <div class="absolute flex h-full w-full items-center justify-center">
        <canvas
          ref={(el) => {
            canvasRef = el;
            setCanvasRef?.(el);
          }}
          class="bg-gray-200"
        />
      </div>
    </div>
  );
}
