import { API_STAFF } from "@/apis";
import { ActionFunctionArgs } from "react-router-dom";
import type { Tstaff } from "@/configs/schema/staffSchema";

export const staffAction = async ({
    request,
}: ActionFunctionArgs): Promise<Tresponse> => {
    console.log("-> staff action request: ", request);
    const data = await request.formData();
    if ("POST" === request.method && data.get("req") === "addStaff") {
        const result = await API_STAFF.staffAdd({
            first_name: data.get("first_name") as string,
            last_name: data.get("last_name") as string,
            phone: data.get("phone") as string,
            email: data.get("email") as string,
            address: data.get("address") as string | null,
            role: data.get("role") as string,
            password: data.get("password") as string,
            pwConfirm: data.get("pwConfirm") as string,
            suburb: data.get("suburb") as string | null,
            city: data.get("city") as string | null,
            state: data.get("state") as string | null,
            country: data.get("country") as string | null,
            postcode: data.get("postcode") as string | null,
            dashboard: Number(data.get("dashboard")),
            clients: Number(data.get("clients")),
            orders: Number(data.get("orders")),
            worklogs: Number(data.get("worklogs")),
            calendar: Number(data.get("calendar")),
            staff: Number(data.get("staff")),
            setting: Number(data.get("setting")),
            hr: Number(data.get("hr")),
            bsb: data.get("bsb") as string,
            account: data.get("account") as string,
        });
        return result;
    } else if ("DELETE" === request.method) {
        const result = await API_STAFF.staffSingleDel(
            data.get("uid") as string
        );
        return result;
    } else if ("PUT" === request.method && data.get("req") === "updateStaff") {
        const result = await API_STAFF.staffSingleUpdate({
            uid: data.get("uid"),
            first_name: data.get("first_name") as string,
            last_name: data.get("last_name") as string,
            phone: data.get("phone") as string,
            email: data.get("email") as string,
            address: data.get("address") as string | null,
            role: data.get("role") as string,
            password: "", // seperate password reset
            pwConfirm: data.get("pwConfirm") as string,
            suburb: data.get("suburb") as string | null,
            city: data.get("city") as string | null,
            state: data.get("state") as string | null,
            country: data.get("country") as string | null,
            postcode: data.get("postcode") as string | null,
            dashboard: Number(data.get("dashboard")),
            clients: Number(data.get("clients")),
            orders: Number(data.get("orders")),
            worklogs: Number(data.get("worklogs")),
            calendar: Number(data.get("calendar")),
            staff: Number(data.get("staff")),
            setting: Number(data.get("setting")),
            hr: Number(data.get("hr")),
            bsb: data.get("bsb") as string,
            account: data.get("account") as string,
        } as Tstaff);
        return result;
    } else if ("PUT" === request.method && data.get("req") === "resetPW") {
        const result = await API_STAFF.staffUpdatePW(
            data.get("uid") as string,
            data.get("password") as string
        );
        return result;
    } else {
        return {
            status: 400,
            msg: "invalid request",
            data: "",
        };
    }
};
