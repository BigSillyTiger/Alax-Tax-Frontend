import apis from "./axios";
import {
    REQ_STAFF_ALL,
    REQ_STAFF_INFO,
    REQ_STAFF_SINGLE_DEL,
    REQ_STAFF_SINGLE_REGISTER,
    REQ_STAFF_SINGLE_UPDATE,
    REQ_STAFF_UPDATE_PW,
} from "./req_list";
import { Tstaff, TstaffForm } from "@/configs/schema/staffSchema";
import { Tresponse } from "@/utils/types";

export const staffAll = async (): Promise<Tresponse> => {
    try {
        const response = await apis.get(REQ_STAFF_ALL);
        return response.data;
    } catch (err: any) {
        console.log("-> retrieve all staff error: ", err);
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
                msg: "failed in retrieving all staff",
                data: "",
            };
        }
    }
};

export const staffInfo = async (uid: number): Promise<Tresponse> => {
    try {
        const response = await apis.post(REQ_STAFF_INFO, { uid });
        return response.data;
    } catch (err) {
        console.log("-> retrieve staff info error: ", err);
        return {
            status: 400,
            msg: "failed in retrieving staff info",
            data: "",
        };
    }
};

export const staffAdd = async (staff: TstaffForm): Promise<Tresponse> => {
    try {
        console.log("-> send register new staff req");
        const response = await apis.post(REQ_STAFF_SINGLE_REGISTER, [staff]);
        return response.data;
    } catch (err) {
        console.log("-> insert one staff err: ", err);
        return {
            status: 400,
            msg: "Failed: register staff",
            data: "",
        };
    }
};

export const staffSingleDel = async (uid: number): Promise<Tresponse> => {
    try {
        const response = await apis.put(REQ_STAFF_SINGLE_DEL, { uid });
        return response.data;
    } catch (err) {
        console.log("-> delete staff failed: ", err);
        return {
            status: 400,
            msg: "failed in delete staff",
            data: "",
        };
    }
};

export const staffSingleUpdate = async (staff: Tstaff): Promise<Tresponse> => {
    try {
        const response = await apis.put(REQ_STAFF_SINGLE_UPDATE, staff);
        return response.data;
    } catch (err) {
        console.log("-> update staff failed: ", err);
        return {
            status: 400,
            msg: "failed in updating staff",
            data: "",
        };
    }
};

export const staffUpdatePW = async (
    uid: number,
    pw: string
): Promise<Tresponse> => {
    try {
        const response = await apis.put(REQ_STAFF_UPDATE_PW, { uid, pw });
        return response.data;
    } catch (err) {
        console.log("-> update staff pw failed: ", err);
        return {
            status: 400,
            msg: "failed in updating staff pw",
            data: "",
        };
    }
};
