import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

type Tstate = {
    logoSrc: string;
};

type Taction = {
    setLogoSrc: (src: string) => void;
};

export const logoStore = createStore<Tstate & Taction>((set) => ({
    logoSrc: "",
    setLogoSrc: (src: string) => set((state) => ({ ...state, logoSrc: src })),
}));

export const useLogoStore = <T>(selector: (state: Tstate & Taction) => T) =>
    useStore(logoStore, selector);
