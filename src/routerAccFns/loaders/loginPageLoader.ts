import { redirect, LoaderFunctionArgs } from "react-router-dom";
import { API_ADMIN } from "@/apis";
import { RES_STATUS } from "@/utils/types";

export const loginLoader = async ({ request }: LoaderFunctionArgs) => {
    const search = new URL(request.url).searchParams.get("redirect");
    const result = await API_ADMIN.adminCheck();
    if (result.status === RES_STATUS.SUCCESS) {
        return redirect("/dashboard");
    }
    return search;
};
