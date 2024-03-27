import { API_ADMIN, API_STAFF } from "@/apis";
import { menuList } from "@/configs/utils";
import { routerStore } from "@/configs/zustore";
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
    const allStaff = await API_STAFF.staffAll().then((res) => res.data);
    return defer({ allStaff });
};
