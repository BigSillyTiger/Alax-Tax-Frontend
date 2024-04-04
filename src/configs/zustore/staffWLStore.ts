import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { TwlTableRow } from "../schema/workSchema";

type Tstate = {
    staffWL: TwlTableRow[];
};

type Taction = {
    setStaffWL: (worklogs: TwlTableRow[]) => void;
};

export const staffWLStore = createStore<Tstate & Taction>((set) => ({
    staffWL: [],
    setStaffWL: (worklogs: TwlTableRow[]) =>
        set((state) => ({ ...state, staffWL: worklogs })),
}));

export const useStaffWLStore = <T>(selector: (state: Tstate & Taction) => T) =>
    useStore(staffWLStore, selector);
