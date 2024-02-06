export type Color = {
  r: number;
  g: number;
  b: number;
};

export type Camera = {
  x: number;
  y: number;
};

export enum LayerType {
  Rectangle,
  Ellipse,
  Path,
  Text,
  Note,
}

export type RectangleLayer = {
  x: number;
  y: number;
  fill: Color;
  width: number;
  height: number;
  value?: string;
  type: LayerType.Rectangle;
};

export type EllipseLayer = {
  x: number;
  y: number;
  fill: Color;
  width: number;
  height: number;
  value?: string;
  type: LayerType.Ellipse;
};

export type PathLayer = {
  x: number;
  y: number;
  fill: Color;
  width: number;
  height: number;
  value?: string;
  points: number[][];
  type: LayerType.Path;
};

export type TextLayer = {
  x: number;
  y: number;
  fill: Color;
  width: number;
  height: number;
  value?: string;
  type: LayerType.Text;
};

export type NoteLayer = {
  x: number;
  y: number;
  fill: Color;
  width: number;
  height: number;
  value?: string;
  type: LayerType.Note;
};

export type Point = {
  x: number;
  y: number;
};

export type XYWH = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}

export type CanvasState =
  | {
      mode: CanvasMode.None;
    }
  | {
      mode: CanvasMode.SelectionNet;
      origin: Point;
      current?: Point;
    }
  | {
      mode: CanvasMode.Translating;
      current: Point;
    }
  | {
      mode: CanvasMode.Inserting;
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note;
    }
  | {
      mode: CanvasMode.Resizing;
      corner: Side;
      initialBounds: XYWH;
    }
  | {
      mode: CanvasMode.Pencil;
    }
  | {
      mode: CanvasMode.Pressing;
      origin: Point;
    };

export enum CanvasMode {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  Pencil,
}
