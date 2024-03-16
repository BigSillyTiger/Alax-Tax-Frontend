import apis from "./axios";
import { REQ_WL_ALL } from "./req_list";

export const wlAll = async (): Promise<Tresponse> => {
    try {
        const response = await apis.get(REQ_WL_ALL);
        return response.data;
    } catch (error) {
        return {
            status: 400,
            msg: "failed in retrieving all work logs",
            data: "",
        };
    }
};
