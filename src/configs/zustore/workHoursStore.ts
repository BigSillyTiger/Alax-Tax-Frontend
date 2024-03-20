import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

type Tstate = {
    s_time: string;
    e_time: string;
    b_hour: string;
};

type Taction = {
    setSTime: (sTime: string) => void;
    setETime: (eTime: string) => void;
    setBHour: (bHour: string) => void;
};

export const workHoursStore = createStore<Tstate & Taction>((set) => ({
    s_time: "00:00",
    e_time: "00:00",
    b_hour: "00:00",
    setSTime: (sTime: string) => set((state) => ({ ...state, s_time: sTime })),
    setETime: (eTime: string) => set((state) => ({ ...state, e_time: eTime })),
    setBHour: (bHour: string) => set((state) => ({ ...state, b_hour: bHour })),
}));

export const useWorkHoursStore = <T>(
    selector: (state: Tstate & Taction) => T
) => useStore(workHoursStore, selector);
