import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { routerPaths } from "../utils";

type Tstate = {
    currentRouter: keyof typeof routerPaths;
};

type Taction = {
    setRouter: (router: keyof typeof routerPaths) => void;
};

export const routerStore = createStore<Tstate & Taction>((set) => ({
    currentRouter: "init",
    setRouter: (router: keyof typeof routerPaths) =>
        set((state) => ({ ...state, currentRouter: router })),
}));

export const useRouterStore = <T>(selector: (state: Tstate & Taction) => T) =>
    useStore(routerStore, selector);
