import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Konva from 'konva';

import { addFigure } from '../../store/slices/figureSlice';
import { closeMenu } from '../../store/slices/menuSlice';
import { Figure, Shape } from '../../types/types';
import { RootState } from '../../store';

function isClickInsideFigure(
  point: { x: number; y: number },
  figure: Figure,
  stage: Konva.Stage,
) {
  const figureShape = stage.findOne(`#${figure.id}`);
  if (figureShape) {
    const rect = figureShape.getClientRect();
    return (
      point.x >= rect.x &&
      point.x <= rect.x + rect.width &&
      point.y >= rect.y &&
      point.y <= rect.y + rect.height
    );
  }
  return false;
}

function isClickInsideAnyFigure(
  point: { x: number; y: number },
  figures: Figure[],
  stage: Konva.Stage,
) {
  return figures.some((figure) => isClickInsideFigure(point, figure, stage));
}

function createNewFigure(
  point: { x: number; y: number },
  stageOffset: { x: number; y: number },
  shape: Shape,
): Figure {
  let newFigure = {
    id: Date.now().toString(36),
    x: point.x - stageOffset.x,
    y: point.y - stageOffset.y,
    stroke: '#E12D2D',
    fill: '#212121',
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
  const figures = useSelector((state: RootState) => state.figures.figures);

  const handleOnClick = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      const stage = e.target.getStage();
      if (!stage) return;

      const stageOffset = stage.absolutePosition();
      const point = stage.getPointerPosition();
      if (!point) return;

      if (tool === 'cursor') {
        const clickedInsideAnyFigure = isClickInsideAnyFigure(
          point,
          figures,
          stage,
        );
        if (!clickedInsideAnyFigure) {
          dispatch(closeMenu());
        }
      }

      if (tool === 'shape') {
        const newFigure = createNewFigure(point, stageOffset, shape);
        dispatch(addFigure(newFigure));
      }
    },
    [tool, shape, figures, dispatch],
  );

  return handleOnClick;
};
