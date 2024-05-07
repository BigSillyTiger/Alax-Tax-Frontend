import { adminStore } from "@/configs/zustore";
import apis from "./axios";
import { LOGIN, LOGOUT, ADMIN_CHECK, ACCESS_CHECK } from "./req_list";
import { RES_STATUS } from "@/configs/types";
import { Tadmin } from "@/configs/schema/staffSchema";

export const adminLogin = async (
    email: string,
    password: string
): Promise<Tresponse> => {
    const newPost = {
        email,
        password,
    };
    try {
        const response = await apis.post(LOGIN, newPost);
        adminStore.setState({ currentAdmin: response.data.data as Tadmin });
        return response.data;
    } catch (err: unknown) {
        console.error("err.adminLogin: ", err);
        return { status: RES_STATUS.FAILED, msg: "", data: {} };
    }
};

export const adminLogout = async () => {
    try {
        const response = await apis.get(LOGOUT);
        return response.data.msg;
    } catch (err: unknown) {
        console.log("error adminLogout:", err);

        return false;
    }
};

export const adminCheck = async (): Promise<Tresponse> => {
    try {
        const response = await apis.get(ADMIN_CHECK).then((res) => res.data);
        adminStore.setState({ currentAdmin: response.data as Tadmin });
        return response;
    } catch (err: unknown) {
        console.error("err.adminCheck: ", err);
        return {
            status: RES_STATUS.FAILED,
            msg: "admin check error",
            data: {},
        };
    }
};

export const accessCheck = async (page: string): Promise<Tresponse> => {
    try {
        return await apis.post(ACCESS_CHECK, { page }).then((res) => res.data);
    } catch (err: unknown) {
        console.error("err.accessCheck: ", err);
        return {
            status: RES_STATUS.FAILED,
            msg: "access check error",
            data: false,
        };
    }
};

export const test = async () => {
    try {
        const response = await apis.get("/api/test");
        return response.data;
    } catch (err: unknown) {
        console.error("err.test: ", err);
        return { status: RES_STATUS.FAILED, msg: "", data: {} };
    }
};
