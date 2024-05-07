import { API_ADMIN } from "@/apis";
import { ActionFunctionArgs, redirect } from "react-router-dom";
import { RES_STATUS } from "@/configs/types";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
    const search = new URL(request.url).searchParams.get("redirect");
    const data = await request.formData();

    //await API_ADMIN.test();

    const result = await API_ADMIN.adminLogin(
        data.get("email") as string,
        data.get("password") as string
    );
    if (result.status === RES_STATUS.SUCCESS) {
        return redirect(search ? search : "/dashboard");
    }
    return { actionErr: true };
};
