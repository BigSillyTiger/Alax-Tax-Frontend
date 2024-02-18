import { atom } from "jotai";
import { Tservice, Tunit } from "@/configs/schema/settingSchema";

const initS = {
    id: 0,
    service: "",
    unit: "",
    unit_price: 0,
};

const initU = {
    id: 0,
    unit_name: "",
};

const atSUInitData = atom<Tservice | Tunit>(initS);

export { atSUInitData, initS, initU };
