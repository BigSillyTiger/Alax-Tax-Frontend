import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { TorderArrangement } from "../schema/orderSchema";

type Tstate = {
    selectedDate: Date | undefined;
    orderArrangement: TorderArrangement[];
    currentOA: TorderArrangement | undefined;
};

type Taction = {
    setDate: (date: Date | undefined) => void;
    setOrderArrangement: (orderArrangement: TorderArrangement[]) => void;
    setCurrentOA: (oa: TorderArrangement) => void;
};

export const orderArrangementStore = createStore<Tstate & Taction>((set) => ({
    selectedDate: new Date(),
    orderArrangement: [],
    currentOA: undefined,
    setDate: (date: Date | undefined) =>
        set((state) => ({ ...state, selectedDate: date })),
    setOrderArrangement: (orderArrangement: TorderArrangement[]) =>
        set((state) => ({
            ...state,
            orderArrangement,
        })),
    setCurrentOA: (oa: TorderArrangement) =>
        set((state) => ({
            ...state,
            currentOA: oa,
        })),
}));

export const useOrderArrangementStore = <T>(
    selector: (state: Tstate & Taction) => T
) => useStore(orderArrangementStore, selector);
