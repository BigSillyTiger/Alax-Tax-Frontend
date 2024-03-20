import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { TwlTableRow } from "../schema/workSchema";

type Tstate = {
    todayWorklogs: TwlTableRow[];
    currentWlid: string;
};

type Taction = {
    setWlid: (wlid: string) => void;
    setWorklogs: (worklogs: TwlTableRow[]) => void;
};

export const todayWLStore = createStore<Tstate & Taction>((set) => ({
    todayWorklogs: [],
    currentWlid: "",
    setWlid: (wlid: string) =>
        set((state) => ({ ...state, currentWlid: wlid })),
    setWorklogs: (worklogs: TwlTableRow[]) =>
        set((state) => ({ ...state, todayWorklogs: worklogs })),
}));

export const useTodayWLStore = <T>(selector: (state: Tstate & Taction) => T) =>
    useStore(todayWLStore, selector);
