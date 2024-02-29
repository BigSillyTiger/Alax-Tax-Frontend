import { mOpenOps } from "@/configs/utils";
import { Tservice, Tunit } from "../configs/schema/settingSchema";

export type Tunivers = {
    services: Tservice[];
    units: Tunit[];
};

/**
 * @description  modal open option types for all modals
 */
export type TmodalOpenStates = (typeof mOpenOps)[keyof typeof mOpenOps];

export type Tmodal2ndOpenStates = "" | "ResetPW";
