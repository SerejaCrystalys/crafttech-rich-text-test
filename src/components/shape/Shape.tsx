import { ColorPicker, InputRef, Popover, Select, Slider } from "antd";
import { useEffect, useRef, useState } from "react";
import { Group, Rect, Text } from "react-konva";
import { Html } from "react-konva-utils";
import { Figure } from "../canvas/Canvas";

type TextStyles = {
  fontWeight?: string;
  fontSize?: number;
  fill?: string;
};

interface Props extends Figure {
  drag: boolean;
  tool: string;
  setEditId: (value: string) => void;
  isEditing: boolean;
}

const Shape = (props: Props) => {
  const inputRef = useRef<InputRef>(null);

  const { id, x, y, width, height, tool, drag, setEditId, isEditing } = props;
  const [value, setValue] = useState("");
  const [textStyles, setTextStyles] = useState<TextStyles>({
    fontWeight: "normal",
    fontSize: 20,
    fill: "#000",
  });

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [inputRef, isEditing]);

  const handleClick = () => {
    if (tool === "shape") return;

    setEditId(id);
  };

  const handleChange = (props: TextStyles) => {
    setTextStyles({
      fontWeight: props.fontWeight || textStyles.fontWeight,
      fontSize: props.fontSize || textStyles.fontSize,
      fill: props.fill || textStyles.fill,
    });
  };

  return (
    <>
      <Group x={x} y={y} onClick={handleClick} draggable>
        <Rect x={0} y={0} width={width} height={height} stroke={"black"} />
        <Text
          x={5}
          y={5}
          wrap="word"
          width={width - 10}
          height={height - 10}
          fontSize={textStyles.fontSize}
          fontStyle={textStyles.fontWeight}
          text={isEditing ? "" : value}
          fill={textStyles.fill}
          lineHeight={1}
        />
        <Html>
          <Popover
            align={{ offset: [0, 10] }}
            open={isEditing && !drag}
            placement="bottom"
            arrow={false}
            content={
              <>
                <div className="label">Font weight:</div>
                <Select
                  defaultValue={textStyles.fontWeight}
                  style={{ width: 120 }}
                  onChange={(value) =>
                    handleChange({
                      fontWeight: value,
                    })
                  }
                  size="large"
                  options={[
                    { value: "normal", label: "Normal" },
                    { value: "bold", label: "Bold" },
                  ]}
                />
                <div className="label">Font Size:</div>
                <Slider
                  min={0}
                  max={50}
                  onChange={(value) =>
                    handleChange({
                      fontSize: value,
                    })
                  }
                  value={textStyles.fontSize}
                  step={1}
                />
                <ColorPicker
                  defaultValue={textStyles.fill}
                  value={textStyles.fill}
                  onChangeComplete={(value) =>
                    handleChange({
                      fill: "#" + value.toHex(),
                    })
                  }
                  size="large"
                  showText
                />
              </>
            }
          >
            {isEditing && (
              <textarea
                style={{
                  fontSize: textStyles.fontSize,
                  fontWeight: textStyles.fontWeight,
                  color: textStyles.fill,
                }}
                onClick={() => setEditId(id)}
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
              />
            )}
          </Popover>
        </Html>
      </Group>
    </>
  );
};

export default Shape;
