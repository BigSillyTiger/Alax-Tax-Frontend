import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { TworkLogs } from "../schema/workSchema";
import { Tstaff } from "../schema/staffSchema";

type Tstate = {
    selectedDate: Date | undefined;
    currentWorkLogs: TworkLogs[];
    allStaff: (Tstaff & { selected: boolean })[];
};

type Taction = {
    setWorkLogs: (workLogs: TworkLogs[]) => void;
    selectStaff: (index: number, selected: boolean) => void;
    setDate: (date: Date) => void;
};

export const jobAssignStore = createStore<Tstate & Taction>((set) => ({
    selectedDate: undefined,
    currentWorkLogs: [],
    allStaff: [],
    setWorkLogs: (workLogs: TworkLogs[]) =>
        set((state) => ({ ...state, currentWorkLogs: workLogs })),
    selectStaff: (index: number, selected: boolean) =>
        set((state) => ({
            allStaff: state.allStaff.map((staff, i) =>
                i === index ? { ...staff, selected: selected } : staff
            ),
        })),
    setDate: (date: Date) => set((state) => ({ ...state, selectedDate: date })),
}));

export const useJobAssignStore = <T>(
    selector: (state: Tstate & Taction) => T
) => useStore(jobAssignStore, selector);
