import { TworkLog } from "@/configs/schema/workSchema";
import apis from "./axios";
import {
    REQ_WL_ALL,
    REQ_WL_RESET_TIMER,
    REQ_WL_SIGNLE_UPDATE_H,
    REQ_WL_SINGLE_DEL,
    REQ_WL_START_TIMER,
    REQ_WL_TODAY,
} from "./req_list";

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

export const wlSingleDel = async (wlid: string): Promise<Tresponse> => {
    try {
        const response = await apis.delete(REQ_WL_SINGLE_DEL, {
            data: { wlid },
        });
        return response.data;
    } catch (error) {
        return {
            status: 400,
            msg: `failed in deleting worklog [${wlid}]`,
            data: "",
        };
    }
};

export const wlGetToday = async (): Promise<Tresponse> => {
    try {
        const response = await apis.get(REQ_WL_TODAY);
        return response.data;
    } catch (error) {
        return {
            status: 400,
            msg: "failed in retrieving today's work logs",
            data: "",
        };
    }
};

export const wlStartTimer = async (wlid: string): Promise<Tresponse> => {
    try {
        const response = await apis.post(REQ_WL_START_TIMER, { wlid });
        return response.data;
    } catch (error) {
        return {
            status: 400,
            msg: "failed in starting work timer",
            data: "",
        };
    }
};

export const wlResetTimer = async (wlid: string): Promise<Tresponse> => {
    try {
        const response = await apis.post(REQ_WL_RESET_TIMER, { wlid });
        return response.data;
    } catch (error) {
        return {
            status: 400,
            msg: "failed in resetting work timer",
            data: "",
        };
    }
};
