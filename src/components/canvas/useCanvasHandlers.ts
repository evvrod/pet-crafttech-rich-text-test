import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Konva from 'konva';

import { addFigure } from '../../store/slices/figuresSlice';
import { RootState } from '../../store';

import createFigure from '../../utils/figureUtils';

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
        const newFigure = createFigure(point, stageOffset, shape);
        dispatch(addFigure(newFigure));
      }
    },
    [tool, shape, dispatch],
  );

  return { handleOnClick, stageWidth, stageHeight };
};
