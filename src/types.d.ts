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
