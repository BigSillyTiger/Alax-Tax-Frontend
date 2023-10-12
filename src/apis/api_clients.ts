import apis from "./axios";
import {
    REQ_CLIENT_ALL,
    REQ_CLIENT_INFO,
    REQ_CLIENT_SINGLE_DEL,
    REQ_CLIENT_SINGLE_REGISTER,
    REQ_CLIENT_SINGLE_UPDATE,
} from "./req_list";
import { Tclient, TclientUnreg } from "@/utils/schema/client";
import { Tresponse } from "@/utils/types";

export const clientAll = async (): Promise<Tresponse> => {
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

export const clientInfo = async (client_id: number): Promise<Tresponse> => {
    try {
        const response = await apis.post(REQ_CLIENT_INFO, { client_id });
        return response.data;
    } catch (err: any) {
        console.log("-> retrieve client info error: ", err);
        return {
            status: 400,
            msg: "failed in retrieving client info",
            data: "",
        };
    }
};

export const clientAdd = async (client: TclientUnreg): Promise<Tresponse> => {
    try {
        const response = await apis.post(REQ_CLIENT_SINGLE_REGISTER, client);
        return response.data;
    } catch (err) {
        console.log("-> insert one client err: ", err);
        return {
            status: 400,
            msg: "Failed: register client",
            data: "",
        };
    }
};

export const clientSingleDel = async (id: number): Promise<Tresponse> => {
    try {
        const response = await apis.post(REQ_CLIENT_SINGLE_DEL, { id });
        return response.data;
    } catch (err) {
        console.log("-> delete client failed: ", err);
        return {
            status: 400,
            msg: "failed in delete client",
            data: "",
        };
    }
};

export const clientSingleUpdate = async (
    client: Tclient
): Promise<Tresponse> => {
    try {
        const response = await apis.put(REQ_CLIENT_SINGLE_UPDATE, client);
        return response.data;
    } catch (err) {
        console.log("-> update client failed: ", err);
        return {
            status: 400,
            msg: "failed in update client",
            data: "",
        };
    }
};
