import {
    redirect,
    LoaderFunctionArgs,
    ActionFunctionArgs,
} from "react-router-dom";
import { API_ADMIN, API_ORDER } from "@/apis";
import { RES_STATUS, Tresponse } from "@/utils/types";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const pname = new URL(request.url).pathname;

    try {
        const result = await API_ADMIN.adminCheck();
        if (result.status === RES_STATUS.SUCCESS) {
            return result.data;
        }
        return pname
            ? redirect(`/login?redirect=${pname}`)
            : redirect("/login");
    } catch (err) {
        return redirect("/login");
    }
};

export const action = async ({
    request,
}: ActionFunctionArgs): Promise<Tresponse> => {
    const data = await request.formData();

    if ("DELETE" === request.method) {
        const result = await API_ORDER.orderDel({
            order_id: data.get("order_id"),
        });
        //console.log("-> client page receive delete order result: ", result);
        return result;
    }
    // errors
    else {
        return {
            status: 400,
            msg: "invalid request",
            data: "",
        };
    }
};
