import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { TctPayment } from "../types";

type Tstate = {
    currentYear: string;
    yearAll: string[];
    orderAll: TctPayment;
    paymentAll: TctPayment;
    unpaidAll: TctPayment;
};

type Taction = {
    setCurrentYear: (cy: string) => void;
    setYearAll: (ya: string[]) => void;
    setOrderall: (oa: TctPayment) => void;
    setPamentAll: (pa: TctPayment) => void;
    setUnpaidAll: (ua: TctPayment) => void;
};

export const ctPaymentStore = createStore<Tstate & Taction>((set) => ({
    currentYear: "",
    yearAll: [],
    paymentAll: {},
    orderAll: {},
    unpaidAll: {},
    setCurrentYear: (cy: string) =>
        set((state) => ({ ...state, currentYear: cy })),
    setYearAll: (ya: string[]) => set((state) => ({ ...state, yearAll: ya })),
    setPamentAll: (pa: TctPayment) =>
        set((state) => ({ ...state, paymentAll: pa })),
    setOrderall: (oa: TctPayment) =>
        set((state) => ({ ...state, orderAll: oa })),
    setUnpaidAll: (ua: TctPayment) =>
        set((state) => ({ ...state, unpaidAll: ua })),
}));

export const useCtPaymentStore = <T>(
    selector: (state: Tstate & Taction) => T
) => useStore(ctPaymentStore, selector);
