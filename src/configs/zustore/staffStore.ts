import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { TstaffWPayslip } from "../schema/staffSchema";

type Tstate = {
    allStaff: TstaffWPayslip[];
};

type Taction = {
    setAllStaff: (staff: TstaffWPayslip[]) => void;
};

export const staffStore = createStore<Tstate & Taction>((set) => ({
    allStaff: [],
    setAllStaff: (staff: TstaffWPayslip[]) =>
        set((state) => ({ ...state, allStaff: staff })),
}));

export const useStaffStore = <T>(selector: (state: Tstate & Taction) => T) =>
    useStore(staffStore, selector);
