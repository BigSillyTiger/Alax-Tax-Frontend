import { API_ORDER } from "@/apis";
import { ActionFunctionArgs } from "react-router-dom";

export const servicesAction = async ({
    request,
}: ActionFunctionArgs): Promise<Tresponse> => {
    const data = await request.formData();
    data.get("req") &&
        console.log("-> order/client action req data: ", data.get("req"));

    if ("PUT" === request.method) {
        const result = await API_ORDER.orderChangeStatus({
            cid: data.get("cid"),
            oid: data.get("oid"),
            status: data.get("status")?.toString().toLocaleLowerCase(),
        });
        return result;
    }
    // errors
    else {
        return {
            status: 400,
            msg: "invalid request",
            data: "",
        };
    }
};
