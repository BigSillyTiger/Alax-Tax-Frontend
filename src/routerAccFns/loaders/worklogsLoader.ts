import { API_ADMIN, API_WORKLOGS } from "@/apis";
import { menuList } from "@/configs/utils/router";
import { adminStore, routerStore } from "@/configs/zustore";
import { defer, redirect } from "react-router-dom";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { Tadmin } from "@/configs/schema/staffSchema";

export const wlLoader = async () => {
    routerStore.setState({ currentRouter: "workLogs" });
    try {
        await API_ADMIN.accessCheck(menuList[3].id)
            .then((res) => {
                //return !res.data && redirect("/login");
                if (!(res.data as Tadmin).worklogs) {
                    return redirect("/login");
                } else {
                    adminStore.setState({ currentAdmin: res.data as Tadmin });
                    return res.data;
                }
            })
            .catch((error) => {
                console.log("-> Error: orders page admin check: ", error);
                return redirect("/login");
            });

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
