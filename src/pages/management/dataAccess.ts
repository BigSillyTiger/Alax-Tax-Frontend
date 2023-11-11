import { API_MANAGE } from "@/apis";
import { defer } from "react-router-dom";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import type { Tresponse } from "@/utils/types";

// create loader and action function for service list page
export const loader = async ({ request }: LoaderFunctionArgs) => {
    const univers = await API_MANAGE.uniAll();
    const company = await API_MANAGE.companyGet();

    return defer({ univers, company: company.data });
};

export const action = async ({
    request,
}: ActionFunctionArgs): Promise<Tresponse> => {
    //console.log("-> /management action request: ", request);
    const data = await request.formData();
    if ("POST" === request.method) {
        /* add new service / unit action */
        const temp = data.get("service")
            ? {
                  // service
                  service: data.get("service") as string,
                  unit: data.get("unit") as string,
                  unit_price: Number(data.get("unit_price")),
              }
            : { unit_name: data.get("unit_name") as string }; // unit
        const result = await API_MANAGE.uniAdd(temp);
        return result;
    } else if ("DELETE" === request.method) {
        /* delete service / unit action */
        const result = await API_MANAGE.uniDel({
            id: Number(data.get("id")),
            type: data.get("type") as "service" | "unit",
        });
        return result;
    } else if ("PUT" === request.method && !data.get("req")) {
        /* edit service / unit action */
        const temp = data.get("service")
            ? {
                  id: Number(data.get("id")),
                  service: data.get("service") as string,
                  unit: data.get("unit") as string,
                  unit_price: Number(data.get("unit_price")),
              }
            : {
                  id: Number(data.get("id")),
                  unit_name: data.get("unit_name") as string,
              };
        const result = await API_MANAGE.uniEdit(temp);
        return result;
    } else if ("PUT" === request.method && data.get("req") === "company") {
        const temp = {
            id: Number(data.get("id")),
            name: data.get("name") as string,
            bld: data.get("bld") as string,
            phone: data.get("phone") as string,
            email: data.get("email") as string,
            address: data.get("address") as string,
            abn: data.get("abn") as string,
            bsb: data.get("bsb") as string,
            acc: data.get("acc") as string,
            logoName: data.get("logoName") as string,
        };
        console.log("-> action company: ", temp);
        const result = await API_MANAGE.companyUpdate(temp);
        return result;
    } else {
        return {
            status: 400,
            msg: "invalid request",
            data: "",
        };
    }
};
