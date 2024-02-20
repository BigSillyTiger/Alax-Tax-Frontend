import { mOpenOps } from "@/configs/utils";
import { Tservice, Tunit } from "../configs/schema/settingSchema";

export type Tresponse = {
    status: number;
    msg: string;
    data: unknown;
};

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
    //
    FAILED = 400,
    FAILED_DUP = 401,
    FAILED_DUP_PHONE = 402,
    FAILED_DUP_EMAIL = 403,
    FAILED_DUP_P_E = 404,
    FAILED_DEL = 405,
    FAILED_ADD_NEW_SU = 406,
}

export type TisConflict =
    | RES_STATUS.SUCCESS
    | RES_STATUS.FAILED_DUP_PHONE
    | RES_STATUS.FAILED_DUP_EMAIL
    | RES_STATUS.FAILED_DUP_P_E;

export type Tunivers = {
    services: Tservice[];
    units: Tunit[];
};

/**
 * @description  modal open option types for all modals
 */
export type TmodalOpenStates = (typeof mOpenOps)[keyof typeof mOpenOps];

export type Tmodal2ndOpenStates = "" | "ResetPW";

export type TmenuOptions = {
    edit?: boolean;
    del?: boolean;
    pay?: boolean;
    invoice?: boolean;
    quotation?: boolean;
    assign?: boolean;
};

export type Tmode = "sm" | "md" | "lg" | "xl" | "full" | "md-full";

export type TorderStatus = "Pending" | "Processing" | "Closed" | "Completed";
