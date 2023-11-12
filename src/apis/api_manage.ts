import apis from "./axios";
import {
    REQ_MANAGE_UNI_ALL,
    REQ_MANAGE_UNI_ADD,
    REQ_MANAGE_UNI_DEL,
    REQ_MANAGE_UNI_EDIT,
    REQ_MANAGE_GET_COMPANY,
    REQ_MANAGE_UPDATE_COMPANY,
    REQ_MANAGE_LOGO_UPDATE,
    REQ_MANAGE_LOGO,
} from "./req_list";
import {
    Tcompany,
    TnewService,
    TnewUnit,
    Tservice,
    Tunit,
} from "@/configs/schema/manageSchema";
import { Tresponse } from "@/utils/types";

export const companyGet = async (): Promise<Tresponse> => {
    try {
        const response = await apis.get(REQ_MANAGE_GET_COMPANY);
        return response.data;
    } catch (error) {
        console.log("-> retrieve company error: ", error);
        return {
            status: 400,
            msg: "failed in retrieving company",
            data: "",
        };
    }
};

export const companyUpdate = async (company: Tcompany) => {
    try {
        const response = await apis.put(REQ_MANAGE_UPDATE_COMPANY, company);
        return response.data;
    } catch (error) {
        console.log("-> update company error: ", error);
        return {
            status: 400,
            msg: "failed in updating company",
            data: "",
        };
    }
};

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

export const uniAdd = async (unit: TnewService | TnewUnit) => {
    try {
        const response = await apis.post(REQ_MANAGE_UNI_ADD, unit);
        return response.data;
    } catch (err) {
        console.log("-> insert service / unit err: ", err);
        return {
            status: 400,
            msg: "Failed: add service / unit",
            data: "",
        };
    }
};

export const logoUpdate = async (logoData: File) => {
    try {
        const response = await apis.put(
            REQ_MANAGE_LOGO_UPDATE,
            { logo: logoData },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log("-> update logo error: ", error);
        return {
            status: 400,
            msg: "failed in updating logo",
            data: "",
        };
    }
};

export const logo = async () => {
    try {
        const response = await apis.get(REQ_MANAGE_LOGO);
        return response.data;
    } catch (error) {
        console.log("-> retrieve logo error: ", error);
        return {
            status: 400,
            msg: "failed in retrieving logo",
            data: "",
        };
    }
};
