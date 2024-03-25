import { API_ADMIN, API_WORKLOGS } from "@/apis";
import { menuList } from "@/configs/utils";
import { routerStore } from "@/configs/zustore";
import { defer, redirect } from "react-router-dom";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { dateFormatAU, hmsTohm } from "@/utils/utils";

export const wlLoader = async () => {
    routerStore.setState({ currentRouter: "workLogs" });
    try {
        const accessResult = await API_ADMIN.accessCheck(menuList[2].id);
        if (!accessResult.data) {
            return redirect("/login");
        }
        const worklogs = await API_WORKLOGS.wlAll()
            .then((res) => res.data as TwlTableRow[])
            .then((res) => {
                return res.map((wl: TwlTableRow) => {
                    return {
                        ...wl,
                        // convert the date format stored in mysql: yyyy-mm-dd to au: dd-mm-yyyy
                        // this format is related to date searching in the table
                        wl_date: dateFormatAU(wl.wl_date),
                        s_time: hmsTohm(wl.s_time as string),
                        e_time: hmsTohm(wl.e_time as string),
                        b_time: hmsTohm(wl.b_time as string),
                        b_hour: hmsTohm(wl.b_hour as string),
                    };
                });
            })
            .catch((error) => {
                console.error("Error fetching worklogs:", error);
                return []; // Return an empty array in case of an error
            });

        return defer({
            worklogs,
        });
    } catch (err) {
        console.log("-> worklogs page loader error: ", err);
        return redirect("/login");
    }
};
