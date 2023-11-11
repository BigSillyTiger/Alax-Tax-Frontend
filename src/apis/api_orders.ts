import apis from "./axios";
import {
    REQ_ORDER_ALL,
    REQ_ORDER_ADD,
    REQ_ORDER_UPDATE,
    REQ_ORDER_DEL,
    REQ_ORDER_W_CLIENT,
    REQ_ORDER_STATUS,
    REQ_PAYMENT_UPDATE,
    REQ_INVOICE_ISSUE_UPDATE,
} from "./req_list";
import { Tresponse } from "@/utils/types";

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

export const orderUpdate = async (data: any) => {
    try {
        const response = await apis.put(REQ_ORDER_UPDATE, data);
        return response.data;
    } catch (err: any) {
        console.log("-> error: update order: ", err);
        return {
            status: 400,
            msg: "failed in updating order",
            data: "",
        };
    }
};

export const orderWClient = async (client_id: number): Promise<Tresponse> => {
    try {
        const response = await apis.post(REQ_ORDER_W_CLIENT, { client_id });
        return response.data;
    } catch (err: any) {
        console.log("-> retrieve client info error: ", err);
        return {
            status: 400,
            msg: "failed in retrieving client orders",
            data: "",
        };
    }
};

export const orderDel = async (data: any): Promise<Tresponse> => {
    try {
        const response = await apis.delete(REQ_ORDER_DEL, { data });
        return response.data;
    } catch (err: any) {
        return {
            status: 400,
            msg: "failed in deleting client order",
            data: "",
        };
    }
};

export const orderChangeStatus = async (data: any): Promise<Tresponse> => {
    try {
        const response = await apis.put(REQ_ORDER_STATUS, data);
        return response.data;
    } catch (err: any) {
        return {
            status: 400,
            msg: "failed in changing order status",
            data: "",
        };
    }
};

export const paymentUpdate = async (data: any): Promise<Tresponse> => {
    try {
        const response = await apis.put(REQ_PAYMENT_UPDATE, data);
        return response.data;
    } catch (error) {
        return {
            status: 400,
            msg: "failed in updating payment",
            data: "",
        };
    }
};

export const updateInvoiceIssue = async (
    date: string,
    order_id: number
): Promise<Tresponse> => {
    try {
        const response = await apis.put(REQ_INVOICE_ISSUE_UPDATE, {
            date,
            order_id,
        });
        return response.data;
    } catch (error) {
        return {
            status: 400,
            msg: "failed in updating invoice issue",
            data: "",
        };
    }
};
