import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

type Tstate = {
    wlNote: string;
};

type Taction = {
    setWlNote: (note: string) => void;
};

export const jobWLStore = createStore<Tstate & Taction>((set) => ({
    wlNote: "",

    setWlNote: (note: string) => set({ wlNote: note }),
}));

export const useJobWLStore = <T>(selector: (state: Tstate & Taction) => T) =>
    useStore(jobWLStore, selector);
