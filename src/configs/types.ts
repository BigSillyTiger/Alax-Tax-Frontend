import { ORDER_STATUS, WL_STATUS } from "@/configs/utils/setting";
import { Tservice, Tunit } from "./schema/settingSchema";
import { statusColor, timeBtnStyleMap } from "./utils/color";
import { actionReqList, menuList } from "./utils/router";
import { roleOptions } from "./utils/staff";
import { defaultMenuOptions, mOpenOps } from "./utils/modal";

export type Tunivers = {
    services: Tservice[];
    units: Tunit[];
};

export type TmenuID = (typeof menuList)[number]["id"];

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
    SUC_INSERT_PAYSLIP = 210,
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
    FAILED_INSERT_PAYSLIP = 409,
}

export type TisConflict =
    | RES_STATUS.SUCCESS
    | RES_STATUS.FAILED_DUP_PHONE
    | RES_STATUS.FAILED_DUP_EMAIL
    | RES_STATUS.FAILED_DUP_P_E;

export type TstaffRole = keyof typeof roleOptions;

export type TstatusColor = keyof typeof statusColor;

export type TorderStatus = (typeof ORDER_STATUS)[number];
export type TwlStatus = (typeof WL_STATUS)[number];

export type TactionReqList = (typeof actionReqList)[keyof typeof actionReqList];

export type TmenuOptions = Partial<typeof defaultMenuOptions>;

export type TitemContent = { title: string; content: JSX.Element };
