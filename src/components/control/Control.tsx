import React from "react";
import "./control_styles.css";

type Tool = {
  name: string;
  alt: string;
};
const tools: Tool[] = [
  { name: "cursor", alt: "Взаимодействие" },
  { name: "shape", alt: "Добавление" },
];

interface Props {
  setTool: React.Dispatch<React.SetStateAction<string>>;
  tool: string;
}

const Control = ({ setTool, tool }: Props) => {
  const handleOnChange = (value: string) => {
    setTool(value);
  };

  return (
    <div className="container">
      {tools.map((item: Tool, index: number) => {
        return (
          <img
            style={
              tool === item.name
                ? {
                    backgroundColor: "#E9EDFF",
                    borderRadius: "5px",
                  }
                : {}
            }
            className="tool"
            key={index}
            src={`/img/${item.name}.svg`}
            alt={item.alt}
            onClick={() => handleOnChange(item.name)}
          />
        );
      })}
    </div>
  );
};

export default Control;
