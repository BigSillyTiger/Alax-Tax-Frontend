import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { TwlTableRow } from "../schema/workSchema";

type Tstate = {
    allStaffWL: TwlTableRow[];
    staffWL: TwlTableRow[];
};

type Taction = {
    setAllStaffWL: (worklogs: TwlTableRow[]) => void;
    setStaffWL: (worklogs: TwlTableRow[]) => void;
};

export const staffWLStore = createStore<Tstate & Taction>((set) => ({
    staffWL: [],
    allStaffWL: [],
    setAllStaffWL: (worklogs: TwlTableRow[]) =>
        set((state) => ({ ...state, allStaffWL: worklogs })),
    setStaffWL: (worklogs: TwlTableRow[]) =>
        set((state) => ({
            ...state,
            staffWL: worklogs,
        })),
}));

export const useStaffWLStore = <T>(selector: (state: Tstate & Taction) => T) =>
    useStore(staffWLStore, selector);
