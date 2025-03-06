import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Konva from 'konva';

import { addFigure } from '../../store/slices/figuresSlice';
import { Figure, Shape } from '../../types/types';
import { RootState } from '../../store';

function createNewFigure(
  point: { x: number; y: number },
  stageOffset: { x: number; y: number },
  shape: Shape,
): Figure {
  let newFigure = {
    id: Date.now().toString(36),
    x: point.x - stageOffset.x,
    y: point.y - stageOffset.y,
    stroke: '#000000',
    fill: '#FFFFFF',
    html: '',
    text: '',
  } as Figure;

  switch (shape) {
    case 'circle':
      newFigure = { ...newFigure, type: 'circle', radius: 100 };
      break;
    case 'rect':
      newFigure = { ...newFigure, type: 'rect', width: 100, height: 100 };
      break;
    case 'triangle':
      newFigure = { ...newFigure, type: 'triangle', sides: 3, radius: 100 };
      break;
  }

  return newFigure;
}

export const useCanvasHandlers = () => {
  const dispatch = useDispatch();
  const tool = useSelector((state: RootState) => state.tool.tool);
  const shape = useSelector((state: RootState) => state.shape.selectedShape);

  const [stageWidth, setStageWidth] = useState(window.innerWidth);
  const [stageHeight, setStageHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setStageWidth(window.innerWidth);
      setStageHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleOnClick = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      const stage = e.target.getStage();
      if (!stage) return;

      const stageOffset = stage.absolutePosition();
      const point = stage.getPointerPosition();
      if (!point) return;

      if (tool === 'shape') {
        const newFigure = createNewFigure(point, stageOffset, shape);
        dispatch(addFigure(newFigure));
      }
    },
    [tool, shape, dispatch],
  );

  return { handleOnClick, stageWidth, stageHeight };
};
