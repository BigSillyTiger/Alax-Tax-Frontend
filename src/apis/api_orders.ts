import { TwlUnion } from "@/configs/schema/workSchema";
import apis from "./axios";
import {
    ORDER_ALL,
    ORDER_ADD,
    ORDER_UPDATE,
    ORDER_DEL,
    ORDER_W_CLIENT,
    ORDER_STATUS,
    PAYMENT_UPDATE,
    INVOICE_ISSUE_UPDATE,
    JOB_ASSIGN,
    ORDER_ALL_ARRANGEMENT,
} from "./req_list";
import { RES_STATUS } from "@/configs/types";

export const orderAll = async () => {
    try {
        const response = await apis.get(ORDER_ALL);
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
        const response = await apis.post(ORDER_ADD, data);
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
        const response = await apis.put(ORDER_UPDATE, data);
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
        const response = await apis.post(ORDER_W_CLIENT, { cid });
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
        const response = await apis.delete(ORDER_DEL, { data });
        return response.data;
    } catch (err: unknown) {
        return {
            status: RES_STATUS.FAILED_DEL,
            msg: "failed in deleting client order",
            data: "",
        };
    }
};

export const orderChangeStatus = async (data: unknown): Promise<Tresponse> => {
    try {
        const response = await apis.put(ORDER_STATUS, data);
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
        const response = await apis.put(PAYMENT_UPDATE, data);
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
        const response = await apis.put(INVOICE_ISSUE_UPDATE, {
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
    data: TwlUnion[]
): Promise<Tresponse> => {
    //console.log("-> sending update job assignment req: ", data);
    try {
        const response = await apis.post(JOB_ASSIGN, { workLogs: data });
        return response.data;
    } catch (err: unknown) {
        return {
            status: 400,
            msg: "failed in updating job assignment",
            data: "",
        };
    }
};

export const orderAllArrangement = async (): Promise<Tresponse> => {
    try {
        const response = await apis.get(ORDER_ALL_ARRANGEMENT);
        return response.data;
    } catch (err: unknown) {
        console.log("-> retrieve all order arrangement error: ", err);
        return {
            status: 400,
            msg: "failed in retrieving all order arrangement",
            data: "",
        };
    }
};
