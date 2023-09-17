import {
    redirect,
    ActionFunctionArgs,
    LoaderFunctionArgs,
} from "react-router-dom";
import { API_ADMIN } from "@/apis";

export const layoutLoader = async ({ request }: LoaderFunctionArgs) => {
    const pname = new URL(request.url).pathname;
    console.log("=> layout loader url: ", pname);
    try {
        const result = await API_ADMIN.adminCheck();
        if (result.status) {
            return result.permission;
        }
        return pname
            ? redirect(`/login?redirect=${pname}`)
            : redirect("/login");
    } catch (err) {
        return redirect("/login");
    }
};

/* export const layoutAction = async ({ request }: ActionFunctionArgs) => {
    const data = await request.formData();
    const intent = data.get("intent");
    switch (intent) {
        // these 2 cases will need more ui interaction
        // this action is malfunctioned bc now the layout component is not /dashboard but a layout router
        case "logout1":
        case "logout2":
            await API_ADMIN.adminLogout();
            return redirect("/login");
        default:
            return {};
    }
};
 */
