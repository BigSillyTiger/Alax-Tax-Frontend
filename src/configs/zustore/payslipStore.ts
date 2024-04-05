import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { DateRange } from "react-day-picker";

type Tstate = {
    dayRange: DateRange;
};

type Taction = {
    setDayRange: (range: DateRange | undefined) => void;
};

export const payslipStore = createStore<Tstate & Taction>((set) => ({
    dayRange: { from: undefined, to: undefined },
    setDayRange: (range: DateRange | undefined) => set({ dayRange: range }),
}));

export const usePayslipStore = <T>(selector: (state: Tstate & Taction) => T) =>
    useStore(payslipStore, selector);
