import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { Tadmin } from "../schema/staffSchema";
import { genMenuIDObject, staffStandardHR } from "../utils/staff";

type Tstate = {
    currentAdmin: Tadmin;
};

type Taction = {
    initUser: (user: Tadmin) => void;
};

export const adminStore = createStore<Tstate & Taction>((set) => ({
    currentAdmin: {
        uid: "",
        first_name: "",
        last_name: "",
        role: "",
        bsb: "",
        account: "",
        hr: staffStandardHR,
        ...genMenuIDObject(0),
    },
    initUser: (admin: Tadmin) =>
        set((state) => ({ ...state, currentAdmin: admin })),
}));

export const useAdminStore = <T>(selector: (state: Tstate & Taction) => T) =>
    useStore(adminStore, selector);
