export type Figure = {
  width: number;
  height: number;
  type: string;

  x: number;
  y: number;

  scaleX: number;
  scaleY: number;
  rotation: number;

  text: TextStyles;

  // : {
  //   value: string;
  //   fontSize: number;
  //   fontWeight: "normal" | "bold";
  //   color: string;
  // } ;
};

export type TextStyles = {
  value?: string;
  fontWeight?: string;
  fontSize?: number;
  color?: string;
};

export type FigureMap = {
  [id: string]: Figure | undefined;
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
