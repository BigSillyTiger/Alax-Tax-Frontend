import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

type Tstate = {
    s_time: string;
    e_time: string;
    b_time: string;
};

type Taction = {
    setSTime: (sTime: string) => void;
    setETime: (eTime: string) => void;
    setBTime: (bTime: string) => void;
};

export const workHoursStore = createStore<Tstate & Taction>((set) => ({
    s_time: "00:00",
    e_time: "00:00",
    b_time: "00:00",
    setSTime: (sTime: string) => set((state) => ({ ...state, s_time: sTime })),
    setETime: (eTime: string) => set((state) => ({ ...state, e_time: eTime })),
    setBTime: (bTime: string) => set((state) => ({ ...state, b_time: bTime })),
}));

export const useWorkHoursStore = <T>(
    selector: (state: Tstate & Taction) => T
) => useStore(workHoursStore, selector);
