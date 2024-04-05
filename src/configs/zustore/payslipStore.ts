import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { DateRange } from "react-day-picker";
import { TwlTableRow } from "../schema/workSchema";

type Tstate = {
    dayRange: DateRange;
    staffWL: TwlTableRow[];
};

type Taction = {
    setDayRange: (range: DateRange | undefined) => void;
    setStaffWL: (worklogs: TwlTableRow[]) => void;
};

export const payslipStore = createStore<Tstate & Taction>((set) => ({
    dayRange: { from: undefined, to: undefined },
    staffWL: [],
    setDayRange: (range: DateRange | undefined) => set({ dayRange: range }),
    setStaffWL: (worklogs: TwlTableRow[]) =>
        set((state) => ({
            ...state,
            staffWL: worklogs,
        })),
}));

export const usePayslipStore = <T>(selector: (state: Tstate & Taction) => T) =>
    useStore(payslipStore, selector);
