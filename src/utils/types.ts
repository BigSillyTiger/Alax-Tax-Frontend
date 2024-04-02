import {
    actionReqList,
    defaultMenuOptions,
    mOpenOps,
    roleOptions,
    wlStatusColorMap,
} from "@/configs/utils";
import { Tservice, Tunit } from "../configs/schema/settingSchema";
import { timeBtnStyleMap } from "@/configs/utils";

export type Tunivers = {
    services: Tservice[];
    units: Tunit[];
};

/**
 * @description  modal open option types for all modals
 */
export type TmodalOpenStates = (typeof mOpenOps)[keyof typeof mOpenOps];

export type Tmodal2ndOpenStates = "" | "ResetPW";

export type TtimeBtnStyles = keyof typeof timeBtnStyleMap;

export enum RES_STATUS {
    DEFAULT = 9900,
    SUCCESS = 200,
    SUC_DEL = 201,
    SUC_UPDATE = 202,
    SUC_UPDATE_STATUS = 203,
    SUC_UPDATE_PAYMENTS = 204,
    SUC_UPDATE_COMPANY = 205,
    SUC_UPDATE_LOGO = 206,
    SUC_ADD_NEW_SU = 207,
    SUC_UPDATE_WORKLOG = 208,
    SUC_DELETE_WORKLOG = 209,
    //
    FAILED = 400,
    FAILED_DUP = 401,
    FAILED_DUP_PHONE = 402,
    FAILED_DUP_EMAIL = 403,
    FAILED_DUP_P_E = 404,
    FAILED_DEL = 405,
    FAILED_ADD_NEW_SU = 406,
    FAILED_UPDATE_WORKLOG = 407,
    FAILED_DELETE_WORKLOG = 408,
}

export type TisConflict =
    | RES_STATUS.SUCCESS
    | RES_STATUS.FAILED_DUP_PHONE
    | RES_STATUS.FAILED_DUP_EMAIL
    | RES_STATUS.FAILED_DUP_P_E;

export type TstaffRole = keyof typeof roleOptions;

export type TwlStatus = keyof typeof wlStatusColorMap;

export type TactionReqList = (typeof actionReqList)[keyof typeof actionReqList];

export type TmenuOptions = Partial<typeof defaultMenuOptions>;
