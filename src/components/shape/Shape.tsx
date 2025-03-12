import { InputRef } from "antd";
import { useEffect, useRef, useState } from "react";
import { Group, Rect, Text, Transformer } from "react-konva";
import Konva from "konva";

import { Figure } from "../../types";
import useFigures from "../../store/figures";
import EditMenu from "./menu/container";

interface Props extends Figure {
  id: string;
  drag: boolean;
  tool: string;
  setEditId: (value: string) => void;
  isEditing: boolean;
}

const Shape = ({
  id,
  x,
  y,
  scaleX,
  scaleY,
  rotation,
  width,
  height,
  tool,
  drag,
  isEditing,
}: Props) => {
  const inputRef = useRef<InputRef>(null);
  const rectRef = useRef<Konva.Group>(null);
  const trRef = useRef<Konva.Transformer>(null);

  const [isTr, setTr] = useState<boolean>(false);

  const { figuresMap, editId, editFigures, setEditId, deleteFigure } =
    useFigures();
  const findItem = figuresMap[id];

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [inputRef, isEditing]);

  useEffect(() => {
    if (isEditing && trRef.current && rectRef.current && editId === id) {
      trRef.current.nodes([rectRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isEditing, editId, id]);

  useEffect(() => {
    const deleteHandle = (e: KeyboardEvent) => {
      if (e.key === "Delete" && id === editId) {
        deleteFigure(editId);
      }
    };
    document.addEventListener("keydown", deleteHandle);

    return () => document.removeEventListener("keydown", deleteHandle);
  }, [editId, id, deleteFigure]);

  const handleClick = () => {
    if (tool === "shape") return;

    setEditId(id);
  };

  const onDragEnd = (evt: Konva.KonvaEventObject<MouseEvent>) => {
    editFigures(id, {
      ...figuresMap[id]!,
      x: evt.target.x(),
      y: evt.target.y(),
    });
  };

  const onTransformEnd = (evt: Konva.KonvaEventObject<MouseEvent>) => {
    setTr(false);
    const { x, y, scaleX, scaleY, rotation } = evt.currentTarget.attrs;
    editFigures(id, {
      ...figuresMap[id]!,
      x: x,
      y: y,
      scaleX: scaleX,
      scaleY: scaleY,
      rotation: rotation,
    });
  };

  if (!findItem) return <></>;

  return (
    <>
      {isEditing && (
        <Transformer
          ref={trRef}
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ]}
        />
      )}
      <Group
        ref={rectRef}
        x={x}
        y={y}
        scaleX={scaleX}
        scaleY={scaleY}
        rotation={rotation}
        onClick={handleClick}
        draggable
        onDragEnd={onDragEnd}
        onTransformEnd={onTransformEnd}
        onTransformStart={() => setTr(true)}
      >
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          stroke={findItem.shape.strokeColor}
          strokeEnabled={findItem.shape.strokeEnable}
          strokeWidth={findItem.shape.strokeWidth}
          fillAfterStrokeEnabled
          fill={findItem.shape.fill}
        />
        <Text
          x={5}
          y={5}
          wrap="word"
          width={width - 10}
          height={height - 10}
          fontSize={findItem.text.fontSize}
          fontStyle={findItem.text.fontWeight}
          text={isEditing ? "" : findItem.text.value}
          fill={findItem.text.color}
          lineHeight={1}
        />
        <EditMenu id={id} drag={drag} isEditing={isEditing} isTr={isTr} />
      </Group>
    </>
  );
};

export default Shape;
