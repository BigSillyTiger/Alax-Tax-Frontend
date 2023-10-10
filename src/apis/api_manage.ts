import apis from "./axios";
import {
    REQ_MANAGE_SERVICE_ADD,
    REQ_MANAGE_UNI_ALL,
    REQ_MANAGE_UNI_DEL,
    REQ_MANAGE_UNI_EDIT,
    REQ_MANAGE_UNIT_ADD,
} from "./req_list";
import { TnewService, TnewUnit, Tservice, Tunit } from "@/utils/schema/manage";

export const uniAll = async () => {
    try {
        const response = await apis.get(REQ_MANAGE_UNI_ALL);
        return response.data;
    } catch (err) {
        console.log("-> retrieve all service error: ", err);
        return {
            status: 400,
            msg: "failed in retrieving all service",
            data: "",
        };
    }
};

export const uniDel = async ({
    id,
    type,
}: {
    id: number;
    type: "service" | "unit";
}) => {
    try {
        const response = await apis.post(REQ_MANAGE_UNI_DEL, { id, type });
        return response.data;
    } catch (err) {
        console.log("-> delete client failed: ", err);
        return {
            status: 400,
            msg: "failed in delete client",
            data: "",
        };
    }
};

export const uniEdit = async (uni: Tservice | Tunit) => {
    try {
        const response = await apis.put(REQ_MANAGE_UNI_EDIT, uni);
        return response.data;
    } catch (err) {
        console.log("-> edit data failed: ", err);
        return {
            status: 400,
            msg: "failed in edit data",
            data: "",
        };
    }
};

export const serviceAdd = async (service: TnewService) => {
    try {
        const response = await apis.post(REQ_MANAGE_SERVICE_ADD, service);
        return response.data;
    } catch (err) {
        console.log("-> insert one service err: ", err);
        return {
            status: 400,
            msg: "Failed: add service",
            data: "",
        };
    }
};

export const unitAdd = async (unit: TnewUnit) => {
    try {
        const response = await apis.post(REQ_MANAGE_UNIT_ADD, unit);
        return response.data;
    } catch (err) {
        console.log("-> insert one service err: ", err);
        return {
            status: 400,
            msg: "Failed: add service",
            data: "",
        };
    }
};
