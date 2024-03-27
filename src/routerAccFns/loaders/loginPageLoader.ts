import { redirect, LoaderFunctionArgs } from "react-router-dom";
import { API_ADMIN } from "@/apis";
import { RES_STATUS } from "@/utils/types";

export const loginLoader = async ({ request }: LoaderFunctionArgs) => {
    const search = new URL(request.url).searchParams.get("redirect");
    await API_ADMIN.adminCheck()
        .then((res) => {
            return res.status === RES_STATUS.SUCCESS && redirect("/dashboard");
        })
        .catch((error) => {
            console.log("-> Error: login page admin check: ", error);
            return redirect("/login");
        });
    return search;
};
