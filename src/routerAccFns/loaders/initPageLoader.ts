import { API_ADMIN } from "@/apis";
import { routerStore } from "@/configs/zustore";
import { redirect } from "react-router-dom";

export const initLoader = async () => {
    console.log("====> init page loader running...");
    routerStore.setState({ currentRouter: "init" });
    const result = await API_ADMIN.adminCheck();
    if (result.status === RES_STATUS.SUCCESS) {
        return redirect("/dashboard");
    }
    return redirect("/login");
};
