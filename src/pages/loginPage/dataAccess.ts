import { ActionFunctionArgs, redirect, json } from "react-router-dom";
import { API_ADMIN } from "@apis";
import { changeAdminStatus } from "@/redux/features/admin";

export const loginAct = async ({ request }: ActionFunctionArgs) => {
    const data = await request.formData();
    const errors: any = {};

    const result = await API_ADMIN.adminLogin(
        data.get("email") as string,
        data.get("password") as string
    );
    if (result) {
        console.log("-> redirect to dashboard");
        //await changeAdminStatus(true);
        return redirect("/dashboard");
    }
    console.log("-> error occurs!");
    errors.msg = "credentials wrong"; // this msg can be received by current router
    return errors;
};
