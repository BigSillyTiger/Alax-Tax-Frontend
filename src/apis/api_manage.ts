import apis from "./axios";
import {
    SETTING_UNI_ALL,
    SETTING_UNI_ADD,
    SETTING_UNI_DEL,
    SETTING_UNI_EDIT,
    SETTING_GET_COMPANY,
    SETTING_UPDATE_COMPANY,
    SETTING_LOGO_UPDATE,
    SETTING_LOGO,
} from "./req_list";
import {
    Tcompany,
    TnewService,
    TnewUnit,
    Tservice,
    Tunit,
} from "@/configs/schema/settingSchema";

export const companyGet = async (): Promise<Tresponse> => {
    try {
        const response = await apis.get(SETTING_GET_COMPANY);
        return response.data;
    } catch (err: unknown) {
        console.log("-> retrieve company error: ", err);
        return {
            status: 400,
            msg: "failed in retrieving company",
            data: "",
        };
    }
};

export const companyUpdate = async (company: Tcompany) => {
    try {
        const response = await apis.put(SETTING_UPDATE_COMPANY, company);
        return response.data;
    } catch (err: unknown) {
        console.log("-> update company error: ", err);
        return {
            status: 400,
            msg: "failed in updating company",
            data: "",
        };
    }
};

export const uniAll = async () => {
    try {
        const response = await apis.get(SETTING_UNI_ALL);
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
        const response = await apis.post(SETTING_UNI_DEL, { id, type });
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
        const response = await apis.put(SETTING_UNI_EDIT, uni);
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
        const response = await apis.post(SETTING_UNI_ADD, unit);
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
            SETTING_LOGO_UPDATE,
            { logo: logoData },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    } catch (err: unknown) {
        console.log("-> update logo error: ", err);
        return {
            status: 400,
            msg: "failed in updating logo",
            data: "",
        };
    }
};

export const logo = async () => {
    try {
        const response = await apis.get(SETTING_LOGO);
        return response.data;
    } catch (err: unknown) {
        console.log("-> retrieve logo error: ", err);
        return {
            status: 400,
            msg: "failed in retrieving logo",
            data: "",
        };
    }
};
