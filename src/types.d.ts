export type Figure = {
  width: number;
  height: number;
  type: string;
  x: number;
  y: number;
};

export type FigureMap = {
  [id: string]: Figure;
};

// export type FigureStyles = {
//   height: number;
//   width: number;
//   stroke: string;
//   fill: string;
// };

// export type Point = {
//   x: number;
//   y: number;
// };

// export type DefaultConfig = {
//   tl: Point;
//   tr: Point;
//   bl: Point;
//   br: Point;
// };
