import { API_CLIENT } from "@/apis";
import { ActionFunctionArgs } from "react-router-dom";
import type { Tclient } from "@/configs/schema/clientSchema";

export const clientsAction = async ({
    request,
}: ActionFunctionArgs): Promise<Tresponse> => {
    console.log("-> clients action fn");
    //console.log("-> action request: ", request);
    const data = await request.formData();
    if ("POST" === request.method) {
        const result = await API_CLIENT.clientAdd({
            first_name: data.get("first_name") as string,
            last_name: data.get("last_name") as string,
            phone: data.get("phone") as string,
            email: data.get("email") as string,
            address: data.get("address") as string | null,
            suburb: data.get("suburb") as string | null,
            city: data.get("city") as string,
            state: data.get("state") as string,
            country: data.get("country") as string,
            postcode: data.get("postcode")?.toString() as string | null,
        });
        return result;
    } else if ("DELETE" === request.method) {
        const result = await API_CLIENT.clientSingleDel(
            data.get("id") as string
        );
        return result;
    } else if ("PUT" === request.method) {
        const result = await API_CLIENT.clientSingleUpdate({
            cid: data.get("id"),
            first_name: data.get("first_name") as string,
            last_name: data.get("last_name") as string,
            phone: data.get("phone") as string,
            email: data.get("email") as string,
            address: data.get("address") as string | null,
            suburb: data.get("suburb") as string | null,
            city: data.get("city") as string,
            state: data.get("state") as string,
            country: data.get("country") as string,
            postcode: data.get("postcode")?.toString() as string | null,
        } as Tclient);
        return result;
    } else {
        return {
            status: 400,
            msg: "invalid request",
            data: "",
        };
    }
};
