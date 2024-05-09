import { redirect, LoaderFunctionArgs } from "react-router-dom";
import { API_ADMIN } from "@/apis";
import { RES_STATUS } from "@/configs/types";

export const loginLoader = async ({ request }: LoaderFunctionArgs) => {
    //const pname = new URL(request.url).pathname;
    try {
        const search = new URL(request.url).searchParams.get("redirect");
        const result = await API_ADMIN.adminCheck()
            .then((res) => (res.status === RES_STATUS.SUCCESS ? true : false))
            .catch((error) => {
                console.log("-> Error: login page admin check: ", error);
                return false;
            });

        return result ? redirect("/dashboard") : search;
    } catch (error) {
        console.log("-> login page loader error: ", error);
        return redirect("/login");
    }
};
