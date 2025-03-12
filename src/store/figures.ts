import { create } from "zustand";
import { Figure, FigureMap } from "../types";

type Store = {
  figuresMap: FigureMap;
  editId: string;

  loadFigures: (figures: FigureMap) => void;
  editFigures: (id: string, figure: Figure) => void;
  deleteFigure: (id: string) => void;
  setEditId: (id: string) => void;
};

const useFigures = create<Store>((set) => ({
  figuresMap: {},
  editId: "",

  loadFigures: (figures) => set(() => ({ figuresMap: figures })),

  editFigures: (id, figure) =>
    set((state) => {
      const clone = {
        ...state.figuresMap,
        [id]: figure,
      };
      localStorage.setItem("figures", JSON.stringify(clone));
      return {
        figuresMap: clone,
      };
    }),

  deleteFigure: (id) =>
    set((state) => {
      const clone = structuredClone(state.figuresMap);
      delete clone[id];
      localStorage.setItem("figures", JSON.stringify(clone));
      return {
        figuresMap: clone,
      };
    }),

  setEditId: (id) => set(() => ({ editId: id })),
}));

export default useFigures;
