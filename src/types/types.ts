export type Tool = 'cursor' | 'shape';

export type Shape = 'rect' | 'circle' | 'triangle';

export interface BaseFigure {
  id: string;
  x: number;
  y: number;
  stroke: string;
  fill: string;
  html: string;
  widthText: number;
  heightText: number;
}

export interface CircleFigure extends BaseFigure {
  type: 'circle';
  radius: number;
}

export interface RectFigure extends BaseFigure {
  type: 'rect';
  width: number;
  height: number;
}

export interface TriangleFigure extends BaseFigure {
  type: 'triangle';
  radius: number;
  sides: number;
}

export type Figure = CircleFigure | RectFigure | TriangleFigure;
