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
