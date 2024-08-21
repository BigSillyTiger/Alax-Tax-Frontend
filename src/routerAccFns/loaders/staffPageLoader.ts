import { API_ADMIN, API_PAYSLIP, API_SETTING, API_STAFF } from "@/apis";
import { MenuItems } from "@/configs/utils/router";
import { routerStore } from "@/configs/zustore";
import { defer, LoaderFunctionArgs, redirect } from "react-router-dom";

export const staffLoader = async ({ request }: LoaderFunctionArgs) => {
    const pname = new URL(request.url).pathname;
    routerStore.setState({ currentRouter: "staff" });
    try {
        const result = await API_ADMIN.loaderAccessCheck(MenuItems.staff);

        if (!result) {
            return pname
                ? redirect(`/login?redirect=${pname}`)
                : redirect("/login");
        }

        const allPromise = Promise.all([
            API_STAFF.staffAll().then((res) => res.data),
            API_PAYSLIP.psAll().then((res) => res.data),
            API_PAYSLIP.psBonusAll().then((res) => res.data),
            API_SETTING.companyGet().then((res) => res.data),
            API_SETTING.logo().then((res) => res.data),
        ]);

        return defer({ allPromise });
    } catch (error) {
        console.error("Error in staffLoader:", error);
        return redirect("/login");
    }
};
