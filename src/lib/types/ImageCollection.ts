type Image = {
  id: string;
  thumbnail: string;
  original: string;
  author?: string
  width: number;
  height: number;
};

export type ImageCollection = Image[];
