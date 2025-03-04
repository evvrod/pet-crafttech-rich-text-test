export type Tool = 'cursor' | 'shape';

export type Shape = 'rect';

export type Figure = {
  id: string;
  width: number;
  height: number;
  type: Shape;
  x: number;
  y: number;
  html: string;
  text: string;
};
