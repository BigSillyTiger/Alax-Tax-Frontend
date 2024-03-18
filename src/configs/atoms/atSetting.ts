import { atom } from "jotai";
import {
    Tservice,
    Tunit,
    serviceSchema,
    unitSchema,
} from "@/configs/schema/settingSchema";

const initS = serviceSchema.parse({});

const initU = unitSchema.parse({});

const atSUInitData = atom<Tservice | Tunit>(initS);

export { atSUInitData, initS, initU };
