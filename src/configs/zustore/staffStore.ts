import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { Tstaff } from "../schema/staffSchema";

type Tstate = {
    allStaff: Tstaff[];
};

type Taction = {
    setAllStaff: (staff: Tstaff[]) => void;
};

export const staffStore = createStore<Tstate & Taction>((set) => ({
    allStaff: [],
    setAllStaff: (staff: Tstaff[]) =>
        set((state) => ({ ...state, allStaff: staff })),
}));

export const useStaffStore = <T>(selector: (state: Tstate & Taction) => T) =>
    useStore(staffStore, selector);
