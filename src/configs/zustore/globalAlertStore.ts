import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { Tpayslip } from "../schema/payslipSchema";
import { TwlTableRow } from "../schema/workSchema";

type Tstate = {
    unPayslip: Tpayslip[];
    unWorklog: TwlTableRow[];
};

type Taction = {
    setUnPayslip: (ps: Tpayslip[]) => void;
    setUnWorklog: (wl: TwlTableRow[]) => void;
};

export const globalAlertStore = createStore<Tstate & Taction>((set) => ({
    unPayslip: [],
    unWorklog: [],
    setUnPayslip: (ps: Tpayslip[]) =>
        set((state) => ({ ...state, unPayslip: ps })),
    setUnWorklog: (wl: TwlTableRow[]) =>
        set((state) => ({ ...state, unWorklog: wl })),
}));

export const useGlobalAlertStore = <T>(
    selector: (state: Tstate & Taction) => T
) => useStore(globalAlertStore, selector);
