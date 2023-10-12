import apis from "./axios";
import {
    REQ_ORDER_ALL,
    REQ_ORDER_ADD,
    REQ_ORDER_UPDATE,
    REQ_ORDER_DEL,
} from "./req_list";

export const orderAll = async () => {
    try {
        const response = await apis.get(REQ_ORDER_ALL);
        return response.data;
    } catch (err: any) {
        console.log("-> retrieve all order error: ", err);
        return {
            status: 400,
            msg: "failed in retrieving all orders",
            data: "",
        };
    }
};

export const orderAdd = async (data: any) => {
    try {
        const response = await apis.post(REQ_ORDER_ADD, data);
        return response.data;
    } catch (err: any) {
        console.log("-> error: add new order: ", err);
        return {
            status: 400,
            msg: "failed in adding new order",
            data: "",
        };
    }
};
