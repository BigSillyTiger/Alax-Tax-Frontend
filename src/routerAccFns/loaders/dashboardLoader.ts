import { API_ADMIN, API_WORKLOGS } from "@/apis";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { menuList } from "@/configs/utils";
import { routerStore } from "@/configs/zustore";
import { dateFormatAU, hmsTohm } from "@/utils/utils";
import { defer, redirect } from "react-router-dom";

export const dashboardLoader = async () => {
    routerStore.setState({ currentRouter: "workLogs" });
    try {
        await API_ADMIN.accessCheck(menuList[0].id).then((res) => {
            return !res.data && redirect("/login");
        });

        const [todayWL] = await Promise.all([
            API_WORKLOGS.wlGetToday()
                .then((res) => res.data as TwlTableRow[])
                .then((res) => {
                    if (!res) return [];
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
                }),
        ]);

        return defer({ worklogs: todayWL });
    } catch (error) {
        console.log("-> worklogs page loader error: ", error);
        return redirect("/login");
    }
};
