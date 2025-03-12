import { Popover } from "antd";
import { Html } from "react-konva-utils";
import TextEdit from "./text_edit";
import useFigures from "../../../store/figures";
import { FormEvent } from "react";
import ShapeEdit from "./shape_edit";

interface Props {
  id: string;
  isEditing: boolean;
  drag: boolean;
  isTr: boolean;
}

const EditMenu = ({ id, isEditing, drag, isTr }: Props) => {
  const { figuresMap, editFigures, setEditId } = useFigures();
  const findItem = figuresMap[id];

  const onInput = (e: FormEvent<HTMLTextAreaElement>) => {
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
          open={isEditing && !drag && !isTr}
          placement="bottom"
          content={
            <>
              <div className="container popovered">
                <TextEdit
                  id={id}
                  children={
                    <img
                      className="tool small"
                      src={`/img/text.svg`}
                      alt={"text"}
                    />
                  }
                />

                <ShapeEdit
                  id={id}
                  children={
                    <>
                      <img
                        className="tool small"
                        src={`/img/box.svg`}
                        alt={"text"}
                      />
                    </>
                  }
                />
              </div>
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
