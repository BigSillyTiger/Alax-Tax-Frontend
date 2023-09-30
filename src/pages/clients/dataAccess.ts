import { API_CLIENT } from "@/apis";
import {
    defer,
    ActionFunctionArgs,
    LoaderFunctionArgs,
} from "react-router-dom";

export type Tresult = {
    status: number;
    msg: string;
    data: unknown;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const clients = API_CLIENT.clientAll();
    return defer({ clients });
};

export const action = async ({
    request,
}: ActionFunctionArgs): Promise<Tresult> => {
    const data = await request.formData();
    const result = await API_CLIENT.registerNewClient({
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
};
