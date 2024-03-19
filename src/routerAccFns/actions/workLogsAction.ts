import { API_WORKLOGS } from "@/apis";
import { ActionFunctionArgs } from "react-router-dom";

export const wlAction = async ({
    request,
}: ActionFunctionArgs): Promise<Tresponse> => {
    console.log("-> worklogs action request: ", request);
    const data = await request.formData();

    if ("POST" === request.method && data.get("req") === "jobEdit") {
        const wlData = JSON.parse(data.get("values") as string);
        const result = await API_WORKLOGS.wlSingleUpdateHours(wlData);
        return result;
    } else {
        return {
            status: 400,
            msg: "invalid request",
            data: "",
        };
    }
};
