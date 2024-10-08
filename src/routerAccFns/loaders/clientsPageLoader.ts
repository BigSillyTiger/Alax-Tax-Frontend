import { API_ADMIN, API_CLIENT } from "@/apis";
import { MenuItems } from "@/configs/utils/router";
import { routerStore } from "@/configs/zustore";
import { defer, LoaderFunctionArgs, redirect } from "react-router-dom";

export const clientsLoader = async ({ request }: LoaderFunctionArgs) => {
    const pname = new URL(request.url).pathname;
    routerStore.setState({ currentRouter: "clients" });
    try {
        const result = await API_ADMIN.loaderAccessCheck(MenuItems.clients);

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
