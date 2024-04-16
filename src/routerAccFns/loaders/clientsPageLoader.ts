import { API_ADMIN, API_CLIENT } from "@/apis";
import { menuList } from "@/configs/utils/router";
import { routerStore } from "@/configs/zustore";
import { defer, redirect } from "react-router-dom";

export const clientsLoader = async () => {
    console.log("-> clients loader running...");
    routerStore.setState({ currentRouter: "clients" });
    try {
        await API_ADMIN.accessCheck(menuList[1].id).then((res) => {
            return !res.data && redirect("/login");
        });

        const allPromise: Promise<[Tresponse]> = Promise.all([
            API_CLIENT.clientAll(),
        ]);

        return defer({ allPromise });
    } catch (err) {
        console.log("-> client loader err: ", err);
        return redirect("/login");
    }
};
