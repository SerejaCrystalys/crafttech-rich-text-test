import { useRef, useState } from "react";
import Canvas from "./components/canvas/Canvas";
import Control from "./components/control/Control";
import { Stage as StageType } from "konva/lib/Stage";

import "./App.css";

function App() {
  const [tool, setTool] = useState("cursor");
  const stageRef = useRef<StageType | null>(null);

  return (
    <>
      <Canvas tool={tool} stageRef={stageRef} />
      <Control tool={tool} setTool={setTool} />
    </>
  );
}

export default App;
