import apis from "./axios";
import { REQ_LOGIN, REQ_LOGOUT, REQ_ADMIN_CHECK } from "./req_list";
import { json } from "react-router-dom";

export const adminLogin = async (email: string, password: string) => {
    const newPost = {
        email,
        password,
    };
    try {
        const response = await apis.post(REQ_LOGIN, newPost);
        console.log("-> fe login res: ", response);
        return true;
    } catch (err: any) {
        if (err.response) {
            console.error("err.response: ", err.response.data.success);
        } else {
            console.error(`error msg: ${err}`);
        }
        //throw json({ msg: "login failed" }, { status: 401 });
        return false;
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
        return response.data.auth;
    } catch (err: any) {
        if (err.response) {
            console.log("=> err.response: ", err.response);
        } else {
            console.log(`error msg: ${err}`);
        }
    }
};
