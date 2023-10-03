export type Tresponse = {
    status: number;
    msg: string;
    data: unknown;
};

export enum RES_STATUS {
    SUCCESS = 200,
    SUC_DEL_SINGLE = 201,
    SUC_UPDATE = 202,
    //
    FAILED = 400,
    FAILED_DUP_PHONE = 401,
    FAILED_DUP_EMAIL = 402,
    FAILED_DUP_P_E = 403,
    FAILED_DEL = 404,
}
