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
  shape: ShapeStyles;
};

export type TextStyles = {
  value?: string;
  fontWeight?: string;
  fontSize?: number;
  color?: string;
};

export type ShapeStyles = {
  fill?: string;
  strokeEnable?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
};

export type FigureMap = {
  [id: string]: Figure | undefined;
};
