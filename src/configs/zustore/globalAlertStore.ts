import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

type Tstate = {
    currentUser: string;
};

type Taction = {
    initUser: (str: string) => void;
};

export const globalAlertStore = createStore<Tstate & Taction>((set) => ({
    currentUser: "",
    initUser: (str: string) => set((state) => ({ ...state, currentUser: str })),
}));

export const useGlobalAlertStore = <T>(
    selector: (state: Tstate & Taction) => T
) => useStore(globalAlertStore, selector);
