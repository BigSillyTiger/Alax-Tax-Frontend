import { API_ADMIN, API_CLIENT } from "@/apis";
import { Tadmin } from "@/configs/schema/staffSchema";
import { menuList } from "@/configs/utils/router";
import { adminStore, routerStore } from "@/configs/zustore";
import { defer, LoaderFunctionArgs, redirect } from "react-router-dom";

export const clientsLoader = async ({ request }: LoaderFunctionArgs) => {
    const pname = new URL(request.url).pathname;
    routerStore.setState({ currentRouter: "clients" });
    try {
        const result = await API_ADMIN.accessCheck(menuList[1].id)
            .then((res) => {
                if (!res.data || !(res.data as Tadmin).clients) {
                    return false;
                } else {
                    adminStore.setState({ currentAdmin: res.data as Tadmin });
                    return res.data;
                }
            })
            .catch((error) => {
                console.log("-> Error: dashboard page admin check: ", error);
                return false;
            });

        if (!result) {
            return pname
                ? redirect(`/login?redirect=${pname}`)
                : redirect("/login");
        }

        const allPromise: Promise<[Tresponse]> = Promise.all([
            API_CLIENT.clientAll(),
        ]);

        return defer({ allPromise });
    } catch (err) {
        console.log("-> client loader err: ", err);
        return redirect("/login");
    }
};
