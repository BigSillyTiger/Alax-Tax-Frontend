import apis from "./axios";
import {
    REQ_LOGIN,
    REQ_LOGOUT,
    REQ_ADMIN_CHECK,
    REQ_PERMISSION,
    REQ_TEST,
} from "./req_list";
import { RES_STATUS, Tresponse } from "@/utils/types";

export const adminLogin = async (
    email: string,
    password: string
): Promise<Tresponse> => {
    const newPost = {
        email,
        password,
    };
    try {
        const response = await apis.post(REQ_LOGIN, newPost);
        return response.data;
    } catch (err: any) {
        if (err.response) {
            console.error("err.response: ", err.response.data.success);
        } else {
            console.error(`error msg: ${err}`);
        }
        return { status: RES_STATUS.FAILED, msg: "", data: {} };
    }
};

export const adminLogout = async () => {
    try {
        const response = await apis.get(REQ_LOGOUT);
        return response.data.msg;
    } catch (err: any) {
        if (err.response) {
            console.log("=> logout err.response: ", err.response);
        } else {
            console.log(`error msg: ${err}`);
        }
        return false;
    }
};

export const adminCheck = async (): Promise<Tresponse> => {
    try {
        const response = await apis.get(REQ_ADMIN_CHECK);
        return response.data;
    } catch (err: any) {
        if (err.response) {
            console.log("=> err.response: ", err.response);
        } else {
            console.log(`error msg: ${err}`);
        }
        return {
            status: RES_STATUS.FAILED,
            msg: "admin check error",
            data: {},
        };
    }
};

/* none used api */
export const adminPermission = async (email: string): Promise<Tresponse> => {
    const newPost = { email };
    try {
        const response = await apis.post(REQ_PERMISSION, newPost);
        return response.data;
    } catch (err: any) {
        console.log("-> adminPermission: ", err);
        return {
            status: RES_STATUS.FAILED,
            msg: "error: admin permission",
            data: {},
        };
    }
};

export const test = async () => {
    try {
        const response = await apis.get(REQ_TEST);
        return response.data;
    } catch (err: any) {
        if (err.response) {
            console.log("=> err.response: ", err.response);
        } else {
            console.log(`error msg: ${err}`);
        }
        return {
            status: false,
            msg: "api test error",
            data: {},
        };
    }
};
