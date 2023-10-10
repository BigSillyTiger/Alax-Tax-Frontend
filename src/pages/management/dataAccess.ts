import { API_MANAGE } from "@/apis";
import {
    defer,
    ActionFunctionArgs,
    LoaderFunctionArgs,
} from "react-router-dom";
import type { Tresponse } from "@/utils/types";

// create loader and action function for service list page
export const loader = async ({ request }: LoaderFunctionArgs) => {
    const univers = API_MANAGE.uniAll();
    return defer({ univers });
};

export const action = async ({
    request,
}: ActionFunctionArgs): Promise<Tresponse> => {
    //console.log("-> /management action request: ", request);
    const data = await request.formData();
    if ("POST" === request.method && data.get("service")) {
        /* add new service action */
        const result = await API_MANAGE.serviceAdd({
            service: data.get("service") as string,
            unit: data.get("unit") as string,
            unit_price: Number(data.get("unit_price")),
        });
        return result;
    } else if ("POST" === request.method && data.get("unit_name")) {
        /* add new unit action */
        const result = await API_MANAGE.unitAdd({
            unit_name: data.get("unit_name") as string,
        });
        return result;
    } else if ("DELETE" === request.method) {
        /* delete service / unit action */
        const result = await API_MANAGE.uniDel({
            id: Number(data.get("id")),
            type: data.get("type") as "service" | "unit",
        });
        return result;
    } else if ("PUT" === request.method) {
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
    } else {
        return {
            status: 400,
            msg: "invalid request",
            data: "",
        };
    }
};
