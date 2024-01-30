import { atom } from "jotai";
import { TisConflict, Tunivers } from "@/utils/types";
import { RES_STATUS } from "@/utils/types";
import { TmodalOpenStates } from "@/utils/types.ts";
import { Tcompany } from "@/configs/schema/settingSchema";

/**
 * @description info conflict state for data checking with backend
 */
const atInfoConflict = atom<TisConflict>(RES_STATUS.SUCCESS);

/**
 * @description Modal open/close state for all modal
 * @ arguments: TmodalOpenStates
 */
const atModalOpen = atom<TmodalOpenStates>("");

/**
 * @description Universal data state for services list and units list
 */
const atUniData = atom<Tunivers>({
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

export { atInfoConflict, atModalOpen, atUniData, atCompany, atLogo };
