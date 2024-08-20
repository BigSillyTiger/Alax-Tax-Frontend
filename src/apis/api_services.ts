import apis from "./axios";
import { SERVICE_ALL, SERVICE_W_CLIENT } from "./req_list";
import { RES_STATUS } from "@/configs/types";

export const serviceAll = async () => {
    try {
        const response = await apis.get(SERVICE_ALL);
        return response.data;
    } catch (err: unknown) {
        console.log("-> retrieve all service error: ", err);
        return {
            status: RES_STATUS.FAILED,
            msg: "failed in retrieving all services",
            data: "",
        };
    }
};

export const serviceWClient = async (cid: string) => {
    try {
        const response = await apis.post(SERVICE_W_CLIENT, { cid });
        return response.data;
    } catch (err: unknown) {
        console.log("-> retrieve client services error: ", err);
        return {
            status: RES_STATUS.FAILED,
            msg: "failed in retrieving client services",
            data: "",
        };
    }
};
