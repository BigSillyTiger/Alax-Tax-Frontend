import { Tbonus, Tpayslip } from "@/configs/schema/payslipSchema";
import apis from "./axios";
import { PAYSLIP_SINGLE_INSERT } from "./req_list";

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
