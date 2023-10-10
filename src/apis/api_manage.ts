import apis from "./axios";
import {
    REQ_MANAGE_SERVICE_ADD,
    REQ_MANAGE_UNIVERS_ALL,
    REQ_MANAGE_UNIT_ADD,
} from "./req_list";
import { TnewService, TnewUnit } from "@/utils/schema/manage";

export const universAll = async () => {
    try {
        const response = await apis.get(REQ_MANAGE_UNIVERS_ALL);
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
