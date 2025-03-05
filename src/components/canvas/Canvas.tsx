import { Layer, Stage } from 'react-konva';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { useCanvasHandlers } from './useCanvasHandlers';

import Shape from '../shape/Shape';

export default function Canvas() {
  const tool = useSelector((state: RootState) => state.tool.tool);
  const figures = useSelector((state: RootState) => state.figures.figures);

  const handleOnClick = useCanvasHandlers();

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={tool === 'cursor'}
      onClick={handleOnClick}
    >
      <Layer>
        {figures.map((figure) => {
          return <Shape key={figure.id} figure={figure} tool={tool} />;
        })}
      </Layer>
    </Stage>
  );
}
