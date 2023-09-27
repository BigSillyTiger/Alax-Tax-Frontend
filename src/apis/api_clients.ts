import apis from "./axios";
import { REQ_CLIENT_ALL, REQ_CLIENT_SINGLE_REGISTER } from "./req_list";

export type t_clientInfo = {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    address: string | null;
    city: string;
    state: string;
    country: string;
    postcode: string | null;
};

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

export const registerNewClient = async (client: t_clientInfo) => {
    try {
        const response = await apis.post(REQ_CLIENT_SINGLE_REGISTER, client);
        return response.data;
    } catch (err) {
        console.log("-> insert one client err: ", err);
    }
};
