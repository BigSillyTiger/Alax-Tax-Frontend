import { Tbonus, Tpayslip } from "@/configs/schema/payslipSchema";
import apis from "./axios";
import {
    PAYSLIP_SINGLE_INSERT,
    PAYSLIP_SINGLE_DEL,
    PAYSLIP_STATUS_UPDATE,
    PAYSLIP_BONUS_ALL,
} from "./req_list";

export const psSingleInsert = async (
    bonus: Partial<Tbonus>,
    payslip: Partial<Tpayslip>
) => {
    try {
        const response = await apis.post(PAYSLIP_SINGLE_INSERT, {
            bonus,
            payslip,
        });
        return response.data;
    } catch (error) {
        console.log("-> new payslip error: ", error);
        return {
            status: 400,
            msg: "failed in new payslip",
            data: "",
        };
    }
};

export const psSingleDel = async (psid: string) => {
    try {
        const response = await apis.post(PAYSLIP_SINGLE_DEL, {
            psid,
        });
        return response.data;
    } catch (error) {
        console.log("-> del payslip error: ", error);
        return {
            status: 400,
            msg: "failed in del payslip",
            data: "",
        };
    }
};

export const psStatusUpdate = async (psid: string, status: string) => {
    try {
        const response = await apis.put(PAYSLIP_STATUS_UPDATE, {
            psid,
            status,
        });
        return response.data;
    } catch (error) {
        console.log("-> ps status update error: ", error);
        return {
            status: 400,
            msg: "failed in ps status update",
            data: "",
        };
    }
};

export const psBonusAll = async () => {
    try {
        const response = await apis.get(PAYSLIP_BONUS_ALL);
        return response.data;
    } catch (error) {
        console.log("-> ps bonus all error: ", error);
        return {
            status: 400,
            msg: "failed in ps bonus all",
            data: "",
        };
    }
};
