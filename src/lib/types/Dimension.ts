type Dimension = {
  width: number;
  height: number;
  ratio: string;
  title: string;
};

export type GroupedDimensions = { [key: string]: Dimension[] };