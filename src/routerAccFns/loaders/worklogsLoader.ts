import { API_ADMIN, API_WORKLOGS } from "@/apis";
import { menuList } from "@/configs/utils/router";
import { routerStore } from "@/configs/zustore";
import { defer, LoaderFunctionArgs, redirect } from "react-router-dom";
import { TwlTableRow } from "@/configs/schema/workSchema";

export const wlLoader = async ({ request }: LoaderFunctionArgs) => {
    const pname = new URL(request.url).pathname;
    routerStore.setState({ currentRouter: "workLogs" });
    try {
        const result = await API_ADMIN.loaderAccessCheck(menuList[3].id);

        if (!result) {
            return pname
                ? redirect(`/login?redirect=${pname}`)
                : redirect("/login");
        }

        const allPromise = Promise.all([
            API_WORKLOGS.wlAll().then((res) => res.data as TwlTableRow[]),
        ]);

        return defer({
            allPromise,
        });
    } catch (err) {
        console.log("-> worklogs page loader error: ", err);
        return redirect("/login");
    }
};
