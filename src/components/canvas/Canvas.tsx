import { useState, RefObject } from 'react';
import { Layer, Stage } from 'react-konva';
import Konva from 'konva';
import { Tool, Figure } from '../../types/types';
import Shape from '../shape/Shape';

interface ICanvasProps {
  tool: Tool;
  stageRef: RefObject<Konva.Stage>;
}

export default function Canvas(props: ICanvasProps) {
  const { tool, stageRef } = props;
  const [figures, setFigures] = useState<Figure[]>([]);

  function handleOnClick(e: Konva.KonvaEventObject<MouseEvent>) {
    if (tool === 'cursor') return;
    const stage = e.target.getStage();
    if (!stage) return;

    const stageOffset = stage.absolutePosition();
    const point = stage.getPointerPosition();
    if (!point) return;

    setFigures((prev) => [
      ...prev,
      {
        id: Date.now().toString(36),
        width: 100,
        height: 100,
        type: 'rect',
        x: point.x - stageOffset.x,
        y: point.y - stageOffset.y,
        html: '',
        text: '',
      },
    ]);
  }

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={tool === 'cursor'}
      onClick={handleOnClick}
      ref={stageRef}
    >
      <Layer>
        {figures.map((figure) => {
          return <Shape key={figure.id} {...figure} tool={tool} />;
        })}
      </Layer>
    </Stage>
  );
}
