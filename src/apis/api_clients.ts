import { RES_STATUS } from "@/configs/types";
import apis from "./axios";
import {
    CLIENT_ALL,
    CLIENT_INFO,
    CLIENT_SINGLE_DEL,
    CLIENT_SINGLE_REGISTER,
    CLIENT_SINGLE_UPDATE,
} from "./req_list";
import { Tclient, TclientUnreg } from "@/configs/schema/clientSchema";

export const clientAll = async (): Promise<Tresponse> => {
    try {
        const response = await apis.get(CLIENT_ALL);
        return response.data;
    } catch (err: unknown) {
        console.log("-> retrieve all client error: ", err);

        return {
            status: 400,
            msg: "failed in retrieving all clients",
            data: "",
        };
    }
};

export const clientInfo = async (cid: string): Promise<Tresponse> => {
    try {
        const response = await apis.post(CLIENT_INFO, { cid });
        return response.data;
    } catch (err: unknown) {
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
        const response = await apis.post(CLIENT_SINGLE_REGISTER, [client]);
        return response.data;
    } catch (err) {
        console.log("-> insert1 one client err: ", err);
        return {
            status: 400,
            msg: "Failed: register client",
            data: "",
        };
    }
};

export const clientSingleDel = async (cid: string): Promise<Tresponse> => {
    try {
        const response = await apis.post(CLIENT_SINGLE_DEL, { cid });
        return response.data;
    } catch (err: unknown) {
        console.log("-> delete client failed: ", err);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((err as any).response.status === RES_STATUS.FAILED_DEL) {
            return {
                status: RES_STATUS.FAILED_DEL,
                msg: "client has one or more orders",
                data: "",
            };
        }
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
        const response = await apis.put(CLIENT_SINGLE_UPDATE, [client]);
        return response.data;
    } catch (err: unknown) {
        console.log("-> update client failed: ", err);
        return {
            status: 400,
            msg: "failed in update client",
            data: "",
        };
    }
};
