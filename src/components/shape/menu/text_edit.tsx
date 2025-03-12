import { ColorPicker, Popover, Select, Slider } from "antd";

import useFigures from "../../../store/figures";
import { TextStyles } from "../../../types";
import { ReactNode } from "react";

interface Props {
  id: string;
  children: ReactNode;
}

const TextEdit = ({ id, children }: Props) => {
  const { figuresMap, editFigures } = useFigures();
  const findItem = figuresMap[id];

  const textStylesHandle = (props: TextStyles) => {
    editFigures(id, {
      ...findItem!,
      text: {
        ...findItem!.text,
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
            <div className="label">Font weight:</div>
            <Select
              defaultValue={findItem.text.fontWeight}
              style={{ width: 120 }}
              onChange={(value) =>
                textStylesHandle({
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
                textStylesHandle({
                  fontSize: value,
                })
              }
              value={findItem.text.fontSize}
              step={1}
            />
            <ColorPicker
              defaultValue={findItem.text.color}
              value={findItem.text.color}
              onChangeComplete={(value) =>
                textStylesHandle({
                  color: "#" + value.toHex(),
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

export default TextEdit;
