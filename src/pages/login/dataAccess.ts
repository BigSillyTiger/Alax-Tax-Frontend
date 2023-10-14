import {
    //useLoaderData,
    redirect,
    ActionFunctionArgs,
    LoaderFunctionArgs,
} from "react-router-dom";
import { API_ADMIN } from "@/apis";
import { RES_STATUS } from "@/utils/types";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
    const search = new URL(request.url).searchParams.get("redirect");
    const data = await request.formData();

    const result = await API_ADMIN.adminLogin(
        data.get("email") as string,
        data.get("password") as string
    );
    if (result.status) {
        return redirect(search ? search : "/dashboard");
    }
    return { actionErr: true };
};

export const loginLoader = async ({ request }: LoaderFunctionArgs) => {
    const search = new URL(request.url).searchParams.get("redirect");
    const result = await API_ADMIN.adminCheck();
    if (result.status === RES_STATUS.SUCCESS) {
        return redirect("/dashboard");
    }
    return search;
};
