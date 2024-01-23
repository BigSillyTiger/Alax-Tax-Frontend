import { API_STAFF } from "@/apis";
import { defer, ActionFunctionArgs } from "react-router-dom";
import type { Tresponse } from "@/utils/types";
import type { Tstaff } from "@/configs/schema/staffSchema";

export const loader = async () => {
    const allStaff = API_STAFF.staffAll();
    return defer({ allStaff });
};

export const action = async ({
    request,
}: ActionFunctionArgs): Promise<Tresponse> => {
    //console.log("-> action request: ", request);
    const data = await request.formData();
    if ("POST" === request.method) {
        const result = await API_STAFF.staffAdd({
            first_name: data.get("first_name") as string,
            last_name: data.get("last_name") as string,
            phone: data.get("phone") as string,
            email: data.get("email") as string,
            address: data.get("address") as string | null,
            role: data.get("role") as string,
        });
        return result;
    } else if ("DELETE" === request.method) {
        const result = await API_STAFF.staffSingleDel(Number(data.get("uid")));
        return result;
    } else if ("PUT" === request.method) {
        const result = await API_STAFF.staffSingleUpdate({
            uid: Number(data.get("uid")),
            first_name: data.get("first_name") as string,
            last_name: data.get("last_name") as string,
            phone: data.get("phone") as string,
            email: data.get("email") as string,
            address: data.get("address") as string | null,
            role: data.get("role") as string,
        } as Tstaff);
        return result;
    } else {
        return {
            status: 400,
            msg: "invalid request",
            data: "",
        };
    }
};
