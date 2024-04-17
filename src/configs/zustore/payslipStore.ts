import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { DateRange } from "react-day-picker";
import { TwlTableRow } from "../schema/workSchema";
import { Tbonus, Tpayslips } from "../schema/payslipSchema";
import { Tdeduction } from "../schema/workSchema";

type Tstate = {
    dayRange: DateRange;
    staffWL: TwlTableRow[];
    // this bonus is for current payslip
    bonus: Partial<Tbonus>[];
    deduction: Partial<Tdeduction>[];
    payslip: Partial<Tpayslips>;
    // this bonus is for all bonus from bonus table
    allBonus: Tbonus[];
};

type Taction = {
    resetAll: () => void;
    setPayslip: (payslip: Partial<Tpayslips>) => void;
    setDayRange: (range: DateRange | undefined) => void;
    setStaffWL: (worklogs: TwlTableRow[]) => void;
    /* bonus */
    setAllBonus: (bonus: Partial<Tbonus>[]) => void;
    setBonusAmount: (index: number, amount: number) => void;
    setBonusNote: (index: number, note: string) => void;
    appendBonus: (bonus: Partial<Tbonus>) => void;
    removeBonus: (index: number) => void;
    /* deduction */
    setDeduction: (deductions: Partial<Tdeduction>[]) => void;
};

export const payslipStore = createStore<Tstate & Taction>((set) => ({
    payslip: {},
    dayRange: { from: undefined, to: undefined },
    staffWL: [],
    bonus: [],
    deduction: [],
    allBonus: [],
    resetAll: () => {
        set((state) => ({
            ...state,
            dayRange: { from: undefined, to: undefined },
            staffWL: [],
            bonus: [],
            deduction: [],
        }));
    },
    setPayslip: (payslip: Partial<Tpayslips>) =>
        set((state) => ({ ...state, payslip: payslip })),
    setDayRange: (range: DateRange | undefined) =>
        set((state) => ({ ...state, dayRange: range })),
    setStaffWL: (worklogs: TwlTableRow[]) =>
        set((state) => ({
            ...state,
            staffWL: worklogs,
        })),
    /* bonus */
    setAllBonus: (bonus: Partial<Tbonus>[]) =>
        set((state) => ({ ...state, bonus })),
    setBonusAmount: (index: number, amount: number) =>
        set((state) => {
            const newBonus = [...state.bonus];
            newBonus[index] = { ...newBonus[index], amount };
            return { ...state, bonus: newBonus };
        }),
    setBonusNote: (index: number, note: string) =>
        set((state) => {
            const newBonus = [...state.bonus];
            newBonus[index] = { ...newBonus[index], note };
            return { ...state, bonus: newBonus };
        }),
    appendBonus: (bonus: Partial<Tbonus>) =>
        set((state) => ({ ...state, bonus: [...state.bonus, bonus] })),
    removeBonus: (index: number) =>
        set((state) => {
            const newBonus = state.bonus.filter((_, i) => i !== index);
            return { ...state, bonus: newBonus };
        }),
    /* deduction */
    setDeduction: (deductions: Partial<Tdeduction>[]) =>
        set((state) => ({ ...state, deduction: deductions })),
}));

export const usePayslipStore = <T>(selector: (state: Tstate & Taction) => T) =>
    useStore(payslipStore, selector);
