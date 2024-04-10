import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { Tdeduction } from "../schema/workSchema";

type Tstate = {
    deduction: Partial<Tdeduction>[];
};

type Taction = {
    setDeductionAmount: (index: number, amount: number) => void;
    setDeductionNote: (index: number, note: string) => void;
    appendDeduction: (deduction: Partial<Tdeduction>) => void;
    removeDeduction: (index: number) => void;
    setDeduction: (deduction: Partial<Tdeduction>[]) => void;
};

export const deductStore = createStore<Tstate & Taction>((set) => ({
    deduction: [],

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

export const useDeductStore = <T>(selector: (state: Tstate & Taction) => T) =>
    useStore(deductStore, selector);
