export type Tool = 'cursor' | 'shape';

export type Shape = 'rect' | 'circle' | 'triangle';

// export type Figure = {
//   id: string;
//   x: number;
//   y: number;
//   stroke: string;
//   fill: string;
//   html: string;
//   text: string;
//   type: Shape;
// } & (
//   | { type: 'circle'; radius: number }
//   | { type: 'rect'; width: number; height: number }
//   | { type: 'triangle'; sides: number; radius: number }
// );

export interface BaseFigure {
  id: string;
  x: number;
  y: number;
  stroke: string;
  fill: string;
  html: string;
  text: string;
}

interface CircleFigure extends BaseFigure {
  type: 'circle';
  radius: number;
}

interface RectFigure extends BaseFigure {
  type: 'rect';
  width: number;
  height: number;
}

interface TriangleFigure extends BaseFigure {
  type: 'triangle';
  radius: number;
  sides: number;
}

export type Figure = CircleFigure | RectFigure | TriangleFigure;
