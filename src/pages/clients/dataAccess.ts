import { API_CLIENT } from "@/apis";
import {
    defer,
    ActionFunctionArgs,
    LoaderFunctionArgs,
} from "react-router-dom";
import type { Tresponse } from "@/utils/types";
import type { Tclient } from "@/utils/schema/clientSchema";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const clients = API_CLIENT.clientAll();
    return defer({ clients });
};

export const action = async ({
    request,
}: ActionFunctionArgs): Promise<Tresponse> => {
    //console.log("-> action request: ", request);
    const data = await request.formData();
    if ("POST" === request.method) {
        const result = await API_CLIENT.clientAdd({
            first_name: data.get("first_name") as string,
            last_name: data.get("last_name") as string,
            phone: data.get("phone") as string,
            email: data.get("email") as string,
            address: data.get("address") as string | null,
            city: data.get("city") as string,
            state: data.get("state") as string,
            country: data.get("country") as string,
            postcode: data.get("postcode")?.toString() as string | null,
        });
        return result;
    } else if ("DELETE" === request.method) {
        const result = await API_CLIENT.clientSingleDel(Number(data.get("id")));
        return result;
    } else if ("PUT" === request.method) {
        const result = await API_CLIENT.clientSingleUpdate({
            client_id: Number(data.get("id")),
            first_name: data.get("first_name") as string,
            last_name: data.get("last_name") as string,
            phone: data.get("phone") as string,
            email: data.get("email") as string,
            address: data.get("address") as string | null,
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
