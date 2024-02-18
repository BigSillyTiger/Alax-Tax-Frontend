import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { TadminStore } from "../schema/staffSchema";

type Tstate = {
    user: TadminStore;
};

type Taction = {
    initUser: (user: TadminStore) => void;
};

export const adminStore = createStore<Tstate & Taction>((set) => ({
    user: {
        uid: "",
        first_name: "",
        last_name: "",
        role: "",
        dashboard: 0,
        clients: 0,
        orders: 0,
        calendar: 0,
        staff: 0,
        setting: 0,
    },
    initUser: (user: TadminStore) => set((state) => ({ ...state, ...user })),
}));

export const useAdminStore = <T>(selector: (state: Tstate & Taction) => T) =>
    useStore(adminStore, selector);
