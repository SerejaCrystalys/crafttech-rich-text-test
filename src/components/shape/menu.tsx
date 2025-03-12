import { ColorPicker, Popover, Select, Slider } from "antd";
import { Html } from "react-konva-utils";
import useFigures from "../../store/figures";
import { TextStyles } from "../../types";
import { FormEvent } from "react";

interface Props {
  id: string;
  isEditing: boolean;
  drag: boolean;
}

const EditMenu = ({ id, isEditing, drag }: Props) => {
  const { figuresMap, editFigures, setEditId } = useFigures();
  const findItem = figuresMap[id];

  const textStylesHandle = (props: TextStyles) => {
    editFigures(id, {
      ...figuresMap[id]!,
      text: {
        ...findItem!.text,
        ...props,
      },
    });
  };

  const onInput = (e: FormEvent<HTMLTextAreaElement>) => {
    // setValue(e.currentTarget.value);
    editFigures(id, {
      ...figuresMap[id]!,
      text: {
        ...findItem!.text,
        value: e.currentTarget.value,
      },
    });
  };

  if (!findItem) return <></>;

  return (
    <>
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
          {isEditing && (
            <textarea
              style={{
                fontSize: findItem.text.fontSize,
                fontWeight: findItem.text.fontWeight,
                color: findItem.text.color,
              }}
              onClick={() => setEditId(id)}
              value={findItem.text.value}
              onInput={(e) => onInput(e)}
            />
          )}
        </Popover>
      </Html>
    </>
  );
};

export default EditMenu;
