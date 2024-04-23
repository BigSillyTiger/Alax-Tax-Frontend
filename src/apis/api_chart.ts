import apis from "./axios";
import { CT_ORDER_PAYMENT } from "./req_list";

export const chartOrderPayment = async (): Promise<Tresponse> => {
    try {
        const response = await apis.get(CT_ORDER_PAYMENT);
        return response.data;
    } catch (error) {
        return {
            status: 400,
            msg: "failed in retrieving all work logs",
            data: "",
        };
    }
};
