import {
  Figure,
  Shape,
  CircleFigure,
  RectFigure,
  TriangleFigure,
} from '../types/types';

const BASE_FIGURE_BACKGROUND_COLOR = '#FFFFFF';
const BASE_FIGURE_BORDER_COLOR = '#000000';

const BASE_WIDTH = 100;
const BASE_HEIGHT = 100;
const BASE_RADIUS = 100;

function generateId() {
  return Date.now().toString(36);
}

export function isCircle(figure: Figure): figure is CircleFigure {
  return figure.type === 'circle';
}

export function isRect(figure: Figure): figure is RectFigure {
  return figure.type === 'rect';
}

export function isTriangle(figure: Figure): figure is TriangleFigure {
  return figure.type === 'triangle';
}

export function getTextDimensions(figure: Figure) {
  if (isRect(figure)) {
    return getDimensions({
      type: 'rect',
      width: figure.width,
      height: figure.height,
    });
  }

  if (isTriangle(figure)) {
    return getDimensions({
      type: 'triangle',
      radius: figure.radius,
    });
  }

  if (isCircle(figure)) {
    return getDimensions({
      type: 'circle',
      radius: figure.radius,
    });
  }

  return { width: 0, height: 0 };
}

function getDimensions({
  type,
  radius = BASE_RADIUS,
  width = BASE_WIDTH,
  height = BASE_HEIGHT,
}: {
  type: Shape;
  radius?: number;
  width?: number;
  height?: number;
}) {
  switch (type) {
    case 'circle':
      return { width: 1.5 * radius, height: 1.5 * radius };
    case 'rect':
      return { width: width, height: height };
    case 'triangle':
      return { width: radius * 0.8, height: radius * 0.8 };
    default:
      return { width: 0, height: 0 };
  }
}

function createBaseFigure(
  point: { x: number; y: number },
  stageOffset: { x: number; y: number },
) {
  return {
    id: generateId(),
    x: point.x - stageOffset.x,
    y: point.y - stageOffset.y,
    stroke: BASE_FIGURE_BORDER_COLOR,
    fill: BASE_FIGURE_BACKGROUND_COLOR,
    html: '',
  };
}

function createShapeFigure(
  shape: Shape,
  point: { x: number; y: number },
  stageOffset: { x: number; y: number },
) {
  const baseFigure = createBaseFigure(point, stageOffset);
  const { width, height } = getDimensions({ type: shape });

  switch (shape) {
    case 'circle':
      return {
        ...baseFigure,
        type: 'circle',
        radius: BASE_RADIUS,
        widthText: width,
        heightText: height,
      } as CircleFigure;
    case 'rect':
      return {
        ...baseFigure,
        type: 'rect',
        width: BASE_WIDTH,
        height: BASE_HEIGHT,
        widthText: width,
        heightText: height,
      } as RectFigure;
    case 'triangle':
      return {
        ...baseFigure,
        type: 'triangle',
        sides: 3,
        radius: BASE_RADIUS,
        widthText: width,
        heightText: height,
      } as TriangleFigure;
  }
}

export default function createFigure(
  point: { x: number; y: number },
  stageOffset: { x: number; y: number },
  shape: Shape,
): Figure {
  return createShapeFigure(shape, point, stageOffset);
}
