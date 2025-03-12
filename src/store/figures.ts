import { create } from "zustand";
import { Figure, FigureMap } from "../types";

type Store = {
  figuresMap: FigureMap;
  editId: string;

  editFigures: (id: string, figure: Figure) => void;
  setEditId: (id: string) => void;
};

const useFigures = create<Store>((set) => ({
  figuresMap: {},
  editId: "",

  editFigures: (id, figure) =>
    set((state) => ({
      figuresMap: {
        ...state.figuresMap,
        [id]: figure,
      },
    })),

  setEditId: (id) => set(() => ({ editId: id })),
}));

export default useFigures;
