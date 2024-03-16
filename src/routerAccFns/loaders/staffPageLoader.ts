import { API_ADMIN, API_STAFF } from "@/apis";
import { menuList } from "@/configs/utils";
import { routerStore } from "@/configs/zustore";
import { defer, redirect } from "react-router-dom";

export const staffLoader = async () => {
    routerStore.setState({ currentRouter: "staff" });
    const accessResult = await API_ADMIN.accessCheck(menuList[4].id);
    if (!accessResult.data) {
        return redirect("/login");
    }
    const allStaff = API_STAFF.staffAll();
    return defer({ allStaff });
};
