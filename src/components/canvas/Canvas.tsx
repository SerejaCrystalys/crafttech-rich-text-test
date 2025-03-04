import { MutableRefObject, useState } from "react";
import { Layer, Stage } from "react-konva";
import { KonvaEventObject, Node, NodeConfig } from "konva/lib/Node";
import { Stage as StageType } from "konva/lib/Stage";
import Shape from "../shape/Shape";

interface Props {
  tool: string;
  stageRef: MutableRefObject<StageType | null>;
}

export type Figure = {
  id: string;
  width: number;
  height: number;
  type: string;
  x: number;
  y: number;
};

const Canvas = ({ tool, stageRef }: Props) => {
  const [figures, setFigures] = useState<Figure[]>([]);

  const [isDrag, setDrag] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");

  const handleOnClick = (e: KonvaEventObject<MouseEvent, Node<NodeConfig>>) => {
    if (!Object.getPrototypeOf(e.target).className) {
      setEditId("");
    }
    if (tool === "cursor") {
      return;
    }

    const stage = e.target.getStage();
    const stageOffset = stage?.absolutePosition();
    const point = stage?.getPointerPosition();

    setFigures((prev: Figure[]) => [
      ...prev,
      {
        id: Date.now().toString(36),
        width: 100,
        height: 100,
        type: "rect",
        x: point!.x - stageOffset!.x,
        y: point!.y - stageOffset!.y,
      },
    ]);
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={tool === "cursor"}
      onDragStart={() => setDrag(true)}
      onDragEnd={() => setDrag(false)}
      onClick={handleOnClick}
      ref={stageRef}
    >
      <Layer>
        {figures.map((figure: Figure, i: number) => {
          return (
            <Shape
              drag={isDrag}
              key={i}
              isEditing={figure.id === editId}
              setEditId={setEditId}
              {...figure}
              tool={tool}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default Canvas;
