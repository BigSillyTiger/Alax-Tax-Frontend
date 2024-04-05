import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { TwlTableRow } from "../schema/workSchema";

type Tstate = {
    allStaffWL: TwlTableRow[];
};

type Taction = {
    setAllStaffWL: (worklogs: TwlTableRow[]) => void;
};

export const staffWLStore = createStore<Tstate & Taction>((set) => ({
    allStaffWL: [],
    setAllStaffWL: (worklogs: TwlTableRow[]) =>
        set((state) => ({ ...state, allStaffWL: worklogs })),
}));

export const useStaffWLStore = <T>(selector: (state: Tstate & Taction) => T) =>
    useStore(staffWLStore, selector);
