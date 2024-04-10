import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { TadminStore } from "../schema/staffSchema";
import { genMenuIDObject, staffStandardHR } from "../utils";

type Tstate = {
    currentUser: TadminStore;
};

type Taction = {
    initUser: (user: TadminStore) => void;
};

export const adminStore = createStore<Tstate & Taction>((set) => ({
    currentUser: {
        uid: "",
        first_name: "",
        last_name: "",
        role: "",
        bsb: "",
        account: "",
        hr: staffStandardHR,
        ...genMenuIDObject(0),
    },
    initUser: (user: TadminStore) =>
        set((state) => ({ ...state, currentUser: user })),
}));

export const useAdminStore = <T>(selector: (state: Tstate & Taction) => T) =>
    useStore(adminStore, selector);
