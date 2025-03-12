import { Checkbox, ColorPicker, Popover, Slider } from "antd";
import { ReactNode } from "react";
import { ShapeStyles } from "../../../types";
import useFigures from "../../../store/figures";

interface Props {
  children: ReactNode;
  id: string;
}

const ShapeEdit = ({ children, id }: Props) => {
  const { figuresMap, editFigures } = useFigures();
  const findItem = figuresMap[id];

  const changeShapeHandle = (props: ShapeStyles) => {
    editFigures(id, {
      ...findItem!,
      shape: {
        ...findItem?.shape,
        ...props,
      },
    });
  };
  if (!findItem) return <></>;
  return (
    <>
      <Popover
        align={{ offset: [0, 10] }}
        trigger={"click"}
        placement="bottom"
        content={
          <>
            <Checkbox
              defaultChecked={findItem.shape.strokeEnable}
              onChange={() =>
                changeShapeHandle({
                  strokeEnable: !findItem.shape.strokeEnable,
                })
              }
            >
              Stroke
            </Checkbox>
            <div className="label">Stroke width:</div>
            <Slider
              min={0}
              max={50}
              onChange={(value) =>
                changeShapeHandle({
                  strokeWidth: value,
                })
              }
              value={findItem.shape.strokeWidth}
              step={1}
            />
            <div className="label">Stroke color:</div>

            <ColorPicker
              defaultValue={findItem.shape.strokeColor}
              onChangeComplete={(value) =>
                changeShapeHandle({
                  strokeColor: "#" + value.toHex(),
                })
              }
              size="large"
              showText
            />
            <div className="label">Shape fill:</div>
            <ColorPicker
              defaultValue={findItem.shape.fill}
              onChangeComplete={(value) =>
                changeShapeHandle({
                  fill: "#" + value.toHex(),
                })
              }
              size="large"
              showText
            />
          </>
        }
      >
        {children}
      </Popover>
    </>
  );
};

export default ShapeEdit;
