import {
    API_ADMIN,
    API_PAYSLIP,
    API_SETTING,
    API_STAFF,
    API_WORKLOGS,
} from "@/apis";
import { Tadmin } from "@/configs/schema/staffSchema";
import { menuList } from "@/configs/utils/router";
import { adminStore, routerStore } from "@/configs/zustore";
import { defer, redirect } from "react-router-dom";

export const staffLoader = async () => {
    routerStore.setState({ currentRouter: "staff" });
    try {
        await API_ADMIN.accessCheck(menuList[5].id)
            .then((res) => {
                //return !res.data && redirect("/login");
                if (!(res.data as Tadmin).staff) {
                    return redirect("/login");
                } else {
                    adminStore.setState({ currentAdmin: res.data as Tadmin });
                    return res.data;
                }
            })
            .catch((error) => {
                console.log("-> Error: staff page admin check: ", error);
                return redirect("/login");
            });

        const allPromise = Promise.all([
            API_WORKLOGS.wlAll().then((res) => res.data),
            API_STAFF.staffAll().then((res) => res.data),
            API_PAYSLIP.psBonusAll().then((res) => res.data),
            API_PAYSLIP.psAll().then((res) => res.data),
            API_SETTING.companyGet().then((res) => res.data),
            API_SETTING.logo().then((res) => res.data),
        ]);

        return defer({ allPromise });
    } catch (error) {
        console.error("Error in staffLoader:", error);
        return redirect("/login");
    }
};
