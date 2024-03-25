import { API_WORKLOGS } from "@/apis";
import { actionReqList } from "@/configs/utils";
import { ActionFunctionArgs } from "react-router-dom";

export const dashboardAction = async ({
    request,
}: ActionFunctionArgs): Promise<Tresponse> => {
    const data = await request.formData();
    if (
        "POST" === request.method &&
        data.get("req") === actionReqList.startTimer
    ) {
        const wlid = data.get("wlid") as string;
        const result = await API_WORKLOGS.wlStartTimer(wlid);
        return result;
    } else if (
        "POST" === request.method &&
        data.get("req") === actionReqList.resetTimer
    ) {
        const wlid = data.get("wlid") as string;
        const result = await API_WORKLOGS.wlResetTimer(wlid);
        return result;
    } else if (
        "POST" === request.method &&
        data.get("req") === actionReqList.pauseTimer
    ) {
        const wlid = data.get("wlid") as string;
        const result = await API_WORKLOGS.wlPauseTimer(wlid);
        return result;
    } else if (
        "POST" === request.method &&
        data.get("req") === actionReqList.resumeTimer
    ) {
        const wlid = data.get("wlid") as string;
        const result = await API_WORKLOGS.wlResumeTimer(wlid);
        return result;
    } else if (
        "POST" === request.method &&
        data.get("req") === actionReqList.stopTimer
    ) {
        const wlid = data.get("wlid") as string;
        const result = await API_WORKLOGS.wlStopTimer(wlid);
        return result;
    } else {
        return {
            status: 400,
            msg: "invalid request",
            data: "",
        };
    }
};
