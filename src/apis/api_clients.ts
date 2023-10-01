import apis from "./axios";
import {
    REQ_CLIENT_ALL,
    REQ_CLIENT_SINGLE_DEL,
    REQ_CLIENT_SINGLE_REGISTER,
} from "./req_list";
import { TclientSchema } from "@/configs/schema/client";

export const clientAll = async () => {
    try {
        const response = await apis.get(REQ_CLIENT_ALL);
        return response.data;
    } catch (err: any) {
        console.log("-> retrieve all client error: ", err);
        if (
            err.response as {
                status: number;
                msg: string;
                data: unknown;
            }
        ) {
            return err.response;
        } else {
            return {
                status: 400,
                msg: "failed in retrieving all clients",
                data: "",
            };
        }
    }
};

export const registerNewClient = async (client: TclientSchema) => {
    try {
        const response = await apis.post(REQ_CLIENT_SINGLE_REGISTER, client);
        return response.data;
    } catch (err) {
        console.log("-> insert one client err: ", err);
    }
};

export const delClient = async (id: number) => {
    try {
        const response = apis.post(REQ_CLIENT_SINGLE_DEL, id);
        return response;
    } catch (err) {
        console.log("-> delete client failed: ", err);
    }
};
