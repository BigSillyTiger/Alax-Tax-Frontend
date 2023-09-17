import apis from "./axios";
import {
    REQ_LOGIN,
    REQ_LOGOUT,
    REQ_ADMIN_CHECK,
    REQ_PERMISSION,
    REQ_TEST,
} from "./req_list";

export const adminLogin = async (email: string, password: string) => {
    const newPost = {
        email,
        password,
    };
    try {
        const response = await apis.post(REQ_LOGIN, newPost);
        console.log("-> fe login res: ", response);
        return response.data;
    } catch (err: any) {
        if (err.response) {
            console.error("err.response: ", err.response.data.success);
        } else {
            console.error(`error msg: ${err}`);
        }
        //throw json({ msg: "login failed" }, { status: 401 });
        return { status: false, msg: "", permission: {} };
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

export const adminCheck = async () => {
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
            status: false,
            msg: "admin check error",
            permission: {},
        };
    }
};

export const adminPermission = async (email: string) => {
    const newPost = { email };
    try {
        const response = await apis.post(REQ_PERMISSION, newPost);
        return response.data;
    } catch (err: any) {
        console.log("-> adminPermission: ", err);
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
            permission: {},
        };
    }
};
