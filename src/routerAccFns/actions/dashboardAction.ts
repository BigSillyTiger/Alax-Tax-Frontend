import { API_WORKLOGS } from "@/apis";
import { ActionFunctionArgs } from "react-router-dom";

export const dashboardAction = async ({
    request,
}: ActionFunctionArgs): Promise<Tresponse> => {
    const data = await request.formData();
    if ("POST" === request.method && data.get("req") === "start_timer") {
        const wlid = data.get("wlid") as string;
        const result = await API_WORKLOGS.wlStartTimer(wlid);
        return result;
    } else if ("POST" === request.method && data.get("req") === "reset_timer") {
        const wlid = data.get("wlid") as string;
        const result = await API_WORKLOGS.wlResetTimer(wlid);
        return result;
    } else {
        return {
            status: 400,
            msg: "invalid request",
            data: "",
        };
    }
};
