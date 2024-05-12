import { API_WORKLOGS } from "@/apis";
import { ActionFunctionArgs } from "react-router-dom";

export const wlAction = async ({
    request,
}: ActionFunctionArgs): Promise<Tresponse> => {
    //console.log("-> worklogs action request: ", request);
    const data = await request.formData();

    if ("POST" === request.method && data.get("req") === "jobEdit") {
        const wlid = JSON.parse(data.get("wlid") as string);
        const wlData = JSON.parse(data.get("values") as string);
        const wlNote = JSON.parse(data.get("wlNote") as string);
        const deduction = JSON.parse(data.get("deduction") as string);
        const result = await API_WORKLOGS.wlSigleUpdateHND(
            wlid,
            wlData,
            wlNote,
            deduction
        );
        return result;
    } else if ("DELETE" === request.method) {
        const wlid = data.get("wlid") as string;
        const result = await API_WORKLOGS.wlSingleDel(wlid);
        return result;
    } else if ("PUT" === request.method && data.get("req") === "wlStatus") {
        const wlid = data.get("wlid") as string;
        const status = data.get("status") as string;
        return await API_WORKLOGS.wlSingleUpdateStatus(wlid, status);
    } else {
        return {
            status: 400,
            msg: "invalid request",
            data: "",
        };
    }
};
