declare type Tresponse = {
    status: number;
    msg: string;
    data: unknown;
};

declare enum RES_STATUS {
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

declare type TisConflict =
    | RES_STATUS.SUCCESS
    | RES_STATUS.FAILED_DUP_PHONE
    | RES_STATUS.FAILED_DUP_EMAIL
    | RES_STATUS.FAILED_DUP_P_E;

declare type Tmode = "sm" | "md" | "lg" | "xl" | "full" | "md-full";

declare type TorderStatus = "Pending" | "Processing" | "Closed" | "Completed";

declare type TmenuOptions = {
    edit?: boolean;
    del?: boolean;
    pay?: boolean;
    invoice?: boolean;
    quotation?: boolean;
    assign?: boolean;
};
