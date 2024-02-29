import {
    redirect,
    LoaderFunctionArgs,
    ActionFunctionArgs,
} from "react-router-dom";
import { API_ADMIN, API_ORDER } from "@/apis";

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
            oid: data.get("oid"),
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
