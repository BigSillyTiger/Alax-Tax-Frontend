import apis from "./axios";
import { REQ_CLIENT_ALL } from "./req_list";

export const clientAll = async () => {
    try {
        const response = await apis.get(REQ_CLIENT_ALL);
        return response.data;
    } catch (err) {
        console.log("-> retrieve all client error: ", err);
        return {
            status: false,
            msg: "failed in retrieving all clients",
        };
    }
};
