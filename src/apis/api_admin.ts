import { adminStore } from "@/configs/zustore";
import apis from "./axios";
import {
    REQ_LOGIN,
    REQ_LOGOUT,
    REQ_ADMIN_CHECK,
    REQ_ACCESS_CHECK,
} from "./req_list";
import { TadminStore } from "@/configs/schema/staffSchema";
import { RES_STATUS } from "@/utils/types";

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
        adminStore.setState({ currentUser: response.data.data as TadminStore });
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
        adminStore.setState({ currentUser: response.data.data as TadminStore });
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

export const accessCheck = async (page: string): Promise<Tresponse> => {
    try {
        const response = await apis.post(REQ_ACCESS_CHECK, { page });
        return response.data;
    } catch (err: any) {
        if (err.response) {
            console.log("=> err.response: ", err.response);
        } else {
            console.log(`error msg: ${err}`);
        }
        return {
            status: RES_STATUS.FAILED,
            msg: "access check error",
            data: false,
        };
    }
};
