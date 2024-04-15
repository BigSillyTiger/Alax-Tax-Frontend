import { Tdeduction, TworkLog } from "@/configs/schema/workSchema";
import apis from "./axios";
import {
    WL_ALL,
    WL_SINGLE_UPDATE_H_D,
    WL_PAUSE_TIMER,
    WL_RESET_TIMER,
    WL_RESUME_TIMER,
    WL_SIGNLE_UPDATE_H,
    WL_SINGLE_DEL,
    WL_START_TIMER,
    WL_STOP_TIMER,
    WL_TODAY,
    WL_SIGNLE_UPDATE_D,
    WL_STATUS,
} from "./req_list";

export const wlAll = async (): Promise<Tresponse> => {
    try {
        const response = await apis.get(WL_ALL);
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
        const response = await apis.post(WL_SIGNLE_UPDATE_H, data);
        return response.data;
    } catch (error) {
        return {
            status: 400,
            msg: "failed in retrieving all work logs",
            data: "",
        };
    }
};

/**
 * @description update work log working hours and deduction
 * @param data
 * @param deduction
 * @returns
 */
export const wlSigleUpdateHD = async (
    data: Partial<TworkLog>,
    deduction: Partial<Tdeduction>[]
): Promise<Tresponse> => {
    try {
        const response = await apis.post(WL_SINGLE_UPDATE_H_D, {
            hourData: data,
            deduction,
        });
        return response.data;
    } catch (error) {
        return {
            status: 400,
            msg: "failed in updating work log",
            data: "",
        };
    }
};

export const wlSingleDel = async (wlid: string): Promise<Tresponse> => {
    try {
        const response = await apis.delete(WL_SINGLE_DEL, {
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
        const response = await apis.get(WL_TODAY);
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
        const response = await apis.post(WL_START_TIMER, { wlid });
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
        const response = await apis.post(WL_RESET_TIMER, { wlid });
        return response.data;
    } catch (error) {
        return {
            status: 400,
            msg: "failed in resetting work timer",
            data: "",
        };
    }
};

export const wlPauseTimer = async (wlid: string): Promise<Tresponse> => {
    try {
        const response = await apis.post(WL_PAUSE_TIMER, { wlid });
        return response.data;
    } catch (error) {
        return {
            status: 400,
            msg: "failed in pausing work timer",
            data: "",
        };
    }
};

export const wlResumeTimer = async (wlid: string): Promise<Tresponse> => {
    try {
        const response = await apis.post(WL_RESUME_TIMER, { wlid });
        return response.data;
    } catch (error) {
        return {
            status: 400,
            msg: "failed in pausing work timer",
            data: "",
        };
    }
};

export const wlStopTimer = async (wlid: string): Promise<Tresponse> => {
    try {
        const response = await apis.post(WL_STOP_TIMER, { wlid });
        return response.data;
    } catch (error) {
        return {
            status: 400,
            msg: "failed in pausing work timer",
            data: "",
        };
    }
};

/**
 * @description
 * @param wlid
 * @param deduction
 * @returns
 */
export const wlDeductionUpdate = async (
    wlid: string,
    deduction: Partial<Tdeduction>[]
): Promise<Tresponse> => {
    try {
        const response = await apis.post(WL_SIGNLE_UPDATE_D, {
            wlid,
            deduction,
        });
        return response.data;
    } catch (error) {
        return {
            status: 400,
            msg: "failed in appending deduction",
            data: "",
        };
    }
};

export const wlSingleUpdateStatus = async (
    wlid: string,
    status: string
): Promise<Tresponse> => {
    try {
        const response = await apis.put(WL_STATUS, {
            wlid,
            status,
        });
        return response.data;
    } catch (error) {
        return {
            status: 400,
            msg: "failed in updating work log status",
            data: "",
        };
    }
};
