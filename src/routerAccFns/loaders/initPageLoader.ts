import { API_ADMIN } from "@/apis";
import { routerStore } from "@/configs/zustore";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { RES_STATUS } from "@/configs/types";

export const initLoader = async ({ request }: LoaderFunctionArgs) => {
    //console.log("====> init page loader running...");
    const pname = new URL(request.url).pathname;
    routerStore.setState({ currentRouter: "init" });
    return await API_ADMIN.adminCheck()
        .then((res) => {
            //return res.status === RES_STATUS.SUCCESS && redirect("/dashboard");
            if (res.status === RES_STATUS.SUCCESS) {
                return redirect("/dashboard");
            }
            return pname
                ? redirect(`/login?redirect=${pname}`)
                : redirect("/login");
        })
        .catch((error) => {
            console.log("-> Error: init page admin check: ", error);
            return redirect("/login");
        });
};
