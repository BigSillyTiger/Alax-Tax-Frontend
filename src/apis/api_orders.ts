import { TworkLogs } from "@/configs/schema/workSchema";
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
    REQ_JOB_ASSIGN,
} from "./req_list";

export const orderAll = async () => {
    try {
        const response = await apis.get(REQ_ORDER_ALL);
        return response.data;
    } catch (err: unknown) {
        console.log("-> retrieve all order error: ", err);
        return {
            status: 400,
            msg: "failed in retrieving all orders",
            data: "",
        };
    }
};

export const orderAdd = async (data: unknown) => {
    try {
        const response = await apis.post(REQ_ORDER_ADD, data);
        return response.data;
    } catch (err: unknown) {
        console.log("-> error: add new order: ", err);
        return {
            status: 400,
            msg: "failed in adding new order",
            data: "",
        };
    }
};

export const orderUpdate = async (data: unknown) => {
    try {
        const response = await apis.put(REQ_ORDER_UPDATE, data);
        return response.data;
    } catch (err: unknown) {
        console.log("-> error: update order: ", err);
        return {
            status: 400,
            msg: "failed in updating order",
            data: "",
        };
    }
};

export const orderWClient = async (cid: string): Promise<Tresponse> => {
    try {
        const response = await apis.post(REQ_ORDER_W_CLIENT, { cid });
        return response.data;
    } catch (err: unknown) {
        console.log("-> retrieve client info error: ", err);
        return {
            status: 400,
            msg: "failed in retrieving client orders",
            data: "",
        };
    }
};

export const orderDel = async (data: unknown): Promise<Tresponse> => {
    try {
        const response = await apis.delete(REQ_ORDER_DEL, { data });
        return response.data;
    } catch (err: unknown) {
        return {
            status: 400,
            msg: "failed in deleting client order",
            data: "",
        };
    }
};

export const orderChangeStatus = async (data: unknown): Promise<Tresponse> => {
    try {
        const response = await apis.put(REQ_ORDER_STATUS, data);
        return response.data;
    } catch (err: unknown) {
        return {
            status: 400,
            msg: "failed in changing order status",
            data: "",
        };
    }
};

export const paymentUpdate = async (data: unknown): Promise<Tresponse> => {
    try {
        const response = await apis.put(REQ_PAYMENT_UPDATE, data);
        return response.data;
    } catch (err: unknown) {
        return {
            status: 400,
            msg: "failed in updating payment",
            data: "",
        };
    }
};

export const updateInvoiceIssue = async (
    date: string,
    oid: string
): Promise<Tresponse> => {
    try {
        const response = await apis.put(REQ_INVOICE_ISSUE_UPDATE, {
            date,
            oid,
        });
        return response.data;
    } catch (err: unknown) {
        return {
            status: 400,
            msg: "failed in updating invoice issue",
            data: "",
        };
    }
};

export const updateJobAssignment = async (
    data: TworkLogs[]
): Promise<Tresponse> => {
    console.log("-> sending update job assignment req: ", data);
    try {
        const response = await apis.post(REQ_JOB_ASSIGN, { workLogs: data });
        return response.data;
    } catch (err: unknown) {
        return {
            status: 400,
            msg: "failed in updating job assignment",
            data: "",
        };
    }
};
