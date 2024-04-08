import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { DateRange } from "react-day-picker";
import { TwlTableRow } from "../schema/workSchema";
import { Tbonus, Tdedcution, Tpayslips } from "../schema/payslipSchema";

type Tstate = {
    dayRange: DateRange;
    staffWL: TwlTableRow[];
    bonus: Partial<Tbonus>[];
    dedcution: Partial<Tdedcution>[];
    payslip: Partial<Tpayslips>;
};

type Taction = {
    setDayRange: (range: DateRange | undefined) => void;
    setStaffWL: (worklogs: TwlTableRow[]) => void;
    /* bonus */
    setBonusAmount: (index: number, amount: number) => void;
    setBonusNote: (index: number, note: string) => void;
    appendBonus: (bonus: Partial<Tbonus>) => void;
    removeBonus: (index: number) => void;
    /* deduction */
    setDeductionAmount: (index: number, amount: number) => void;
    setDeductionNote: (index: number, note: string) => void;
    appendDeduction: (dedcution: Partial<Tdedcution>) => void;
    removeDeduction: (index: number) => void;
};

export const payslipStore = createStore<Tstate & Taction>((set) => ({
    payslip: {},
    dayRange: { from: undefined, to: undefined },
    staffWL: [],
    bonus: [],
    dedcution: [],
    setDayRange: (range: DateRange | undefined) => set({ dayRange: range }),
    setStaffWL: (worklogs: TwlTableRow[]) =>
        set((state) => ({
            ...state,
            staffWL: worklogs,
        })),
    /* bonus */
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
    setDeductionAmount: (index: number, amount: number) =>
        set((state) => {
            const newDeduction = [...state.dedcution];
            newDeduction[index] = { ...newDeduction[index], amount };
            return { ...state, dedcution: newDeduction };
        }),
    setDeductionNote: (index: number, note: string) =>
        set((state) => {
            const newDeduction = [...state.dedcution];
            newDeduction[index] = { ...newDeduction[index], note };
            return { ...state, dedcution: newDeduction };
        }),
    appendDeduction: (dedcution: Partial<Tdedcution>) =>
        set((state) => ({
            ...state,
            dedcution: [...state.dedcution, dedcution],
        })),
    removeDeduction: (index: number) =>
        set((state) => {
            const newDeduction = state.dedcution.filter((_, i) => i !== index);
            return { ...state, dedcution: newDeduction };
        }),
}));

export const usePayslipStore = <T>(selector: (state: Tstate & Taction) => T) =>
    useStore(payslipStore, selector);
