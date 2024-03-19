import { TworkLog } from "@/configs/schema/workSchema";
import apis from "./axios";
import { REQ_WL_ALL, REQ_WL_SIGNLE_UPDATE_H } from "./req_list";

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

export const wlSingleUpdateHours = async (
    data: Partial<TworkLog>
): Promise<Tresponse> => {
    try {
        const response = await apis.post(REQ_WL_SIGNLE_UPDATE_H, data);
        return response.data;
    } catch (error) {
        return {
            status: 400,
            msg: "failed in retrieving all work logs",
            data: "",
        };
    }
};
