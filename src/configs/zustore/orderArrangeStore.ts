import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

type Tstate = {
    selectedDate: Date | undefined;
};

type Taction = {
    setDate: (date: Date | undefined) => void;
};

export const orderArrangementStore = createStore<Tstate & Taction>((set) => ({
    selectedDate: new Date(),
    orderArrangement: [],
    currentOA: undefined,
    setDate: (date: Date | undefined) =>
        set((state) => ({ ...state, selectedDate: date })),
}));

export const useOrderArrangementStore = <T>(
    selector: (state: Tstate & Taction) => T
) => useStore(orderArrangementStore, selector);
