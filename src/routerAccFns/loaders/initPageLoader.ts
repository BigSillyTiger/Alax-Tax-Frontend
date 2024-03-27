import { API_ADMIN } from "@/apis";
import { routerStore } from "@/configs/zustore";
import { redirect } from "react-router-dom";
import { RES_STATUS } from "@/utils/types";

export const initLoader = async () => {
    //console.log("====> init page loader running...");
    routerStore.setState({ currentRouter: "init" });
    return await API_ADMIN.adminCheck()
        .then((res) => {
            return res.status === RES_STATUS.SUCCESS && redirect("/dashboard");
        })
        .catch((error) => {
            console.log("-> Error: init page admin check: ", error);
            return redirect("/login");
        });
};
