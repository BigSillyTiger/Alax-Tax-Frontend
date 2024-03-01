import { atom } from "jotai";
import {
    TmodalOpenStates,
    Tmodal2ndOpenStates,
    Tunivers,
    TisConflict,
    RES_STATUS,
} from "@/utils/types";
import { Tcompany } from "@/configs/schema/settingSchema";
import { Tstaff } from "@/configs/schema/staffSchema";
import { initStaff } from "./atStaff.ts";

/**
 * @description info conflict state for data checking with backend
 */
const atInfoConflict = atom<TisConflict>(RES_STATUS.SUCCESS);

/**
 * @description Modal open/close state for all modal
 * @ arguments: TmodalOpenStates
 * @ this is the 1st level modal state
 */
const atModalOpen = atom<TmodalOpenStates>("");

/**
 * @description 2nd level modal state
 * @ this level is usually hover on top of the 1st level modal
 * @
 */
const at2ndModalOpen = atom<Tmodal2ndOpenStates>("");

/**
 * @description Universal data state for services list and units list
 */
const atSUData = atom<Tunivers>({
    services: [],
    units: [],
});

/**
 * @description state for company info
 */
const atCompany = atom<Tcompany>({
    id: -1,
    name: "",
    bld: "",
    phone: "",
    email: "",
    address: "",
    abn: "",
    bsb: "",
    acc: "",
});

/**
 * @description state for logo address
 */
const atLogo = atom<string>("");

/**
 * @description state for current admin user
 */
const atAdminUser = atom<Tstaff>(initStaff);

export {
    atInfoConflict,
    atModalOpen,
    at2ndModalOpen,
    atSUData,
    atCompany,
    atLogo,
    atAdminUser,
};
