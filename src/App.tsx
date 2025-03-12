import { useEffect, useRef, useState } from "react";
import Canvas from "./components/canvas/Canvas";
import Control from "./components/control/Control";
import { Stage as StageType } from "konva/lib/Stage";

import "./App.css";
import useFigures from "./store/figures";

function App() {
  const [tool, setTool] = useState("cursor");
  const stageRef = useRef<StageType | null>(null);
  const { loadFigures } = useFigures();

  useEffect(() => {
    const storage = localStorage.getItem("figures");
    if (!storage) localStorage.setItem("figures", "{}");
    loadFigures(JSON.parse(localStorage.getItem("figures")!));
  }, []);

  return (
    <>
      <Canvas tool={tool} stageRef={stageRef} />
      <Control tool={tool} setTool={setTool} />
    </>
  );
}

export default App;
