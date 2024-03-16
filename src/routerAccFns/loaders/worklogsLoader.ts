import { API_ADMIN, API_WORKLOGS } from "@/apis";
import { menuList } from "@/configs/utils";
import { routerStore } from "@/configs/zustore";
import { defer, redirect } from "react-router-dom";
import { TwlTableRow } from "@/configs/schema/workSchema";

export const wlLoader = async () => {
    routerStore.setState({ currentRouter: "workLogs" });
    try {
        const accessResult = await API_ADMIN.accessCheck(menuList[2].id);
        if (!accessResult.data) {
            return redirect("/login");
        }
        const worklogs = await API_WORKLOGS.wlAll();

        return defer({
            worklogs: worklogs.data as TwlTableRow[],
        });
    } catch (err) {
        console.log("-> worklogs page loader error: ", err);
        return redirect("/login");
    }
};
