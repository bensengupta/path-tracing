interface ControlsProps {
  onClickStart: () => void;
  onClickReset: () => void;
}

export function Controls({ onClickStart, onClickReset }: ControlsProps) {
  return (
    <div>
      <div class="flex gap-8">
        <button onClick={onClickStart}>Start</button>
        <button onClick={onClickReset}>Reset</button>
      </div>
    </div>
  );
}
