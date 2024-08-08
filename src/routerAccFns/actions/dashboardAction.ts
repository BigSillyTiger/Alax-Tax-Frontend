import { ActionFunctionArgs } from "react-router-dom";

export const dashboardAction = async ({
    request,
}: ActionFunctionArgs): Promise<Tresponse> => {
    const data = await request.formData();

    if (request.method !== "POST") {
        return { status: 400, msg: "invalid request", data: "" };
    }

    return { status: 400, msg: "invalid request", data: data };
};

/*

const data = await request.formData();
    const actionReqMap = {
        [actionReqList.startTimer]: API_WORKLOGS.wlStartTimer,
        [actionReqList.resetTimer]: API_WORKLOGS.wlResetTimer,
        [actionReqList.pauseTimer]: API_WORKLOGS.wlPauseTimer,
        [actionReqList.resumeTimer]: API_WORKLOGS.wlResumeTimer,
        [actionReqList.stopTimer]: API_WORKLOGS.wlStopTimer,
        "wlDeduct": API_WORKLOGS.wlDeductionUpdate
    };

    const req = data.get("req") as string;
    const wlid = data.get("wlid") as string;
    const actionFunction = actionReqMap[req];
    if ("POST" === request.method && actionFunction) {
        const result = await actionFunction(wlid, req === "wlDeduct" ? JSON.parse(data.get("deduction") as string) : undefined);
        return result;
    } else {
        return {
            status: 400,
            msg: "invalid request",
            data: "",
        };
    }
    
*/
