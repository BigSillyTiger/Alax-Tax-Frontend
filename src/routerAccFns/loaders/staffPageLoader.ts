import { API_ADMIN, API_STAFF, API_WORKLOGS } from "@/apis";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { menuList } from "@/configs/utils";
import { routerStore } from "@/configs/zustore";
import { dateFormat, hmsTohm } from "@/lib/time";
import { defer, redirect } from "react-router-dom";

export const staffLoader = async () => {
    routerStore.setState({ currentRouter: "staff" });
    await API_ADMIN.accessCheck(menuList[4].id)
        .then((res) => {
            return !res.data && redirect("/login");
        })
        .catch((error) => {
            console.log("-> Error: staff page admin check: ", error);
            return redirect("/login");
        });
    const worklogs = await API_WORKLOGS.wlAll()
        .then((res) => res.data as TwlTableRow[])
        .then((res) => {
            return (
                res
                    // sort worklogs by date in descending order
                    .sort((a: TwlTableRow, b: TwlTableRow) => {
                        const dateA = new Date(a.wl_date);
                        const dateB = new Date(b.wl_date);

                        // Compare dates
                        if (dateA > dateB) return -1; // Return -1 to indicate dateA comes before dateB
                        if (dateA < dateB) return 1; // Return 1 to indicate dateA comes after dateB
                        return 0;
                    })
                    .map((wl: TwlTableRow) => {
                        return {
                            ...wl,
                            // convert the date format stored in mysql: yyyy-mm-dd to au: dd-mm-yyyy
                            // this format is related to date searching in the table
                            wl_date: dateFormat(wl.wl_date, "au"),
                            s_time: hmsTohm(wl.s_time as string),
                            e_time: hmsTohm(wl.e_time as string),
                            b_time: hmsTohm(wl.b_time as string),
                            b_hour: hmsTohm(wl.b_hour as string),
                        };
                    })
            );
        })
        .catch((error) => {
            console.error("Error fetching worklogs:", error);
            return []; // Return an empty array in case of an error
        });
    const allStaff = await API_STAFF.staffAll().then((res) => res.data);
    return defer({ allStaff, worklogs });
};
