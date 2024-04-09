import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { Tdeduction } from "../schema/workSchema";

type Tstate = {
    s_time: string;
    e_time: string;
    b_hour: string;
    deduction: Partial<Tdeduction>[];
};

type Taction = {
    setSTime: (sTime: string) => void;
    setETime: (eTime: string) => void;
    setBHour: (bHour: string) => void;
    /* deduction */
    setDeductionAmount: (index: number, amount: number) => void;
    setDeductionNote: (index: number, note: string) => void;
    appendDeduction: (deduction: Partial<Tdeduction>) => void;
    removeDeduction: (index: number) => void;
    setDeduction: (deduction: Partial<Tdeduction>[]) => void;
};

export const worklogStore = createStore<Tstate & Taction>((set) => ({
    s_time: "00:00",
    e_time: "00:00",
    b_hour: "00:00",
    deduction: [],
    setSTime: (sTime: string) => set((state) => ({ ...state, s_time: sTime })),
    setETime: (eTime: string) => set((state) => ({ ...state, e_time: eTime })),
    setBHour: (bHour: string) => set((state) => ({ ...state, b_hour: bHour })),
    /* deduction */
    setDeductionAmount: (index: number, amount: number) =>
        set((state) => {
            const newDeduction = [...state.deduction];
            newDeduction[index] = { ...newDeduction[index], amount };
            return { ...state, deduction: newDeduction };
        }),
    setDeductionNote: (index: number, note: string) =>
        set((state) => {
            const newDeduction = [...state.deduction];
            newDeduction[index] = { ...newDeduction[index], note };
            return { ...state, deduction: newDeduction };
        }),
    appendDeduction: (deduction: Partial<Tdeduction>) =>
        set((state) => ({
            ...state,
            deduction: [...state.deduction, deduction],
        })),
    removeDeduction: (index: number) =>
        set((state) => {
            console.log("-> remove index: ", index);
            const newDeduction = state.deduction.filter((_, i) => i !== index);
            console.log("-> new deduction: ", newDeduction);
            return { ...state, deduction: newDeduction };
        }),
    setDeduction: (deduction: Partial<Tdeduction>[]) =>
        set((state) => ({ ...state, deduction })),
}));

export const useWorklogStore = <T>(selector: (state: Tstate & Taction) => T) =>
    useStore(worklogStore, selector);
