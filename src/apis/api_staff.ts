import { ROLES } from "@/configs/utils/staff";
import apis from "./axios";
import {
    STAFF_ALL,
    STAFF_INFO,
    STAFF_SINGLE_DEL,
    STAFF_SINGLE_REGISTER,
    STAFF_SINGLE_UPDATE,
    STAFF_UPDATE_PW,
} from "./req_list";
import { Tstaff, TstaffForm } from "@/configs/schema/staffSchema";
import { RES_STATUS } from "@/configs/types";

export const staffAll = async (): Promise<Tresponse> => {
    try {
        return await apis.get(STAFF_ALL).then((res) => res.data);
    } catch (err: unknown) {
        console.log("-> retrieve all staff error: ", err);
        return {
            status: 400,
            msg: "failed in retrieving all staff",
            data: "",
        };
    }
};

export const staffInfo = async (uid: string): Promise<Tresponse> => {
    try {
        const response = await apis.post(STAFF_INFO, { uid });
        return response.data;
    } catch (err: unknown) {
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
        //console.log("-> add ne wstaff: ", staff);
        const response = await apis.post(STAFF_SINGLE_REGISTER, {
            staff: [staff],
        });
        return response.data;
    } catch (err: unknown) {
        console.log("-> insert one staff err: ", err);
        return {
            status: 400,
            msg: "Failed: register staff",
            data: "",
        };
    }
};

export const staffSingleDel = async (uid: string): Promise<Tresponse> => {
    try {
        const response = await apis.put(STAFF_SINGLE_DEL, { uid });
        return response.data;
    } catch (err: unknown) {
        console.log("-> delete staff failed: ", err);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((err as any).response.status === RES_STATUS.FAILED_DEL) {
            return {
                status: RES_STATUS.FAILED_DEL,
                msg: "staff has one or more orders",
                data: "",
            };
        }
        return {
            status: 400,
            msg: "failed in delete staff",
            data: "",
        };
    }
};

export const staffSingleUpdate = async (
    staff: Tstaff,
    currentRole: keyof typeof ROLES
): Promise<Tresponse> => {
    try {
        const response = await apis.put(STAFF_SINGLE_UPDATE, {
            staff,
            currentRole,
        });
        return response.data;
    } catch (err: unknown) {
        console.log("-> update staff failed: ", err);
        return {
            status: 400,
            msg: "failed in updating staff",
            data: "",
        };
    }
};

export const staffUpdatePW = async (
    uid: string,
    pw: string
): Promise<Tresponse> => {
    try {
        const response = await apis.put(STAFF_UPDATE_PW, { uid, pw });
        return response.data;
    } catch (err: unknown) {
        console.log("-> update staff pw failed: ", err);
        return {
            status: 400,
            msg: "failed in updating staff pw",
            data: "",
        };
    }
};
