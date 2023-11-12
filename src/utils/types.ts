import { Tservice, Tunit } from "../configs/schema/manageSchema";

export type Tresponse = {
    status: number;
    msg: string;
    data: unknown;
};

export enum RES_STATUS {
    SUCCESS = 200,
    SUC_DEL = 201,
    SUC_UPDATE = 202,
    SUC_UPDATE_STATUS = 203,
    SUC_UPDATE_PAYMENTS = 204,
    SUC_UPDATE_COMPANY = 205,
    SUC_UPDATE_LOGO = 206,
    //
    FAILED = 400,
    FAILED_DUP = 401,
    FAILED_DUP_PHONE = 402,
    FAILED_DUP_EMAIL = 403,
    FAILED_DUP_P_E = 404,
    FAILED_DEL = 405,
}

export type Tunivers = {
    services: Tservice[];
    units: Tunit[];
};

export type TclientOrderModal =
    | ""
    | "Del"
    | "Edit"
    | "Add"
    | "Pay"
    | "Invoice"
    | "Quotation";

export type TmenuOptions = {
    edit?: boolean;
    del?: boolean;
    pay?: boolean;
    invoice?: boolean;
    quotation?: boolean;
};

export type Tmode = "sm" | "md" | "lg" | "xl" | "full" | "md-full";
