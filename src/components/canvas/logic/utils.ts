export function clearCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function sleep(millis: number) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}
