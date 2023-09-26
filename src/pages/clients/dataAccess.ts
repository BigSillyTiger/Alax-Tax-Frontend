import { API_CLIENT } from "@/apis";
import {
    defer,
    ActionFunctionArgs,
    LoaderFunctionArgs,
} from "react-router-dom";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const result = API_CLIENT.clientAll();
    return defer({ clients: result });
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const data = await request.formData();
    console.log("-> test first name: ", data.get("first_name"));
    console.log("-> test last name: ", data.get("last_name"));
    console.log("-> test email: ", data.get("email"));
    console.log("-> test state: ", data.get("state"));
    return null;
};
