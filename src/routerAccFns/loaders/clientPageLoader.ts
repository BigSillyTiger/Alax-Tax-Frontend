import { API_ADMIN, API_CLIENT, API_SETTING, API_ORDER } from "@/apis";
import { menuList } from "@/configs/utils/router";
import { routerStore } from "@/configs/zustore";
import { LoaderFunctionArgs, defer, redirect } from "react-router-dom";

/**
 * @description client page loader
 * @param param0 cid
 * @returns
 */
export const clientLoader = async ({ params }: LoaderFunctionArgs) => {
    routerStore.setState({ currentRouter: "client" });
    try {
        await API_ADMIN.accessCheck(menuList[1].id)
            .then((res) => {
                return !res.data && redirect("/login");
            })
            .catch((error) => {
                console.log("-> Error: orders page admin check: ", error);
                return redirect("/login");
            });

        const cid = params.cid as string;

        const allPromise = Promise.all([
            API_CLIENT.clientInfo(cid).then((res) => res.data),
            API_ORDER.orderWClient(cid).then((res) => res.data),
            API_SETTING.uniAll().then((res) => res.data),
            API_SETTING.companyGet().then((res) => res.data),
            API_SETTING.logo().then((res) => res.data),
        ]);

        return defer({ allPromise });
    } catch (err) {
        console.log("-> client page loader error: ", err);
        return redirect("/login");
    }
};
