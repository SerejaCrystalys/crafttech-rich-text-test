import { MutableRefObject, useState } from "react";
import { Layer, Stage } from "react-konva";
import { KonvaEventObject, Node, NodeConfig } from "konva/lib/Node";
import { Stage as StageType } from "konva/lib/Stage";
import Shape from "../shape/Shape";
import useFigures from "../../store/figures";

interface Props {
  tool: string;
  stageRef: MutableRefObject<StageType | null>;
}

const Canvas = ({ tool, stageRef }: Props) => {
  // const { editFigures, figureMap, setEditId, editId } = useContext(ctx);

  const { figuresMap, editId, editFigures, setEditId } = useFigures();

  const [isDrag, setDrag] = useState<boolean>(false);

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

    editFigures(Date.now().toString(36), {
      width: 100,
      height: 100,
      type: "rect",
      x: point!.x - stageOffset!.x,
      y: point!.y - stageOffset!.y,
    });
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
        {Object.keys(figuresMap).map((id: string, index: number) => {
          const figure = figuresMap[id];
          return (
            <Shape
              drag={isDrag}
              key={index}
              id={id}
              isEditing={id === editId}
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
