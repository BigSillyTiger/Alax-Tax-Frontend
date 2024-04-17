import { API_PAYSLIP, API_STAFF } from "@/apis";
import { ActionFunctionArgs } from "react-router-dom";
import type { Tstaff } from "@/configs/schema/staffSchema";

export const staffAction = async ({
    request,
}: ActionFunctionArgs): Promise<Tresponse> => {
    const data = await request.formData();
    data.get("req") &&
        console.log("-> staff action req data: ", data.get("req"));

    /* add a new staff */
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
    } else if ("POST" === request.method && data.get("req") === "newPayslip") {
        const bonus = JSON.parse(data.get("bonus") as string);
        const payslip = JSON.parse(data.get("payslip") as string);
        return await API_PAYSLIP.psSingleInsert(bonus, payslip);
    } else if ("DELETE" === request.method && data.get("req") === "delStaff") {
        return await API_STAFF.staffSingleDel(data.get("uid") as string);
    } else if (
        "DELETE" === request.method &&
        data.get("req") === "delPayslip"
    ) {
        return await API_PAYSLIP.psSingleDel(data.get("psid") as string);
    } else if ("PUT" === request.method && data.get("req") === "updateStaff") {
        return await API_STAFF.staffSingleUpdate({
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
    } else if ("PUT" === request.method && data.get("req") === "resetPW") {
        return await API_STAFF.staffUpdatePW(
            data.get("uid") as string,
            data.get("password") as string
        );
    } else if ("PUT" === request.method && data.get("req") === "psStatus") {
        return await API_PAYSLIP.psStatusUpdate(
            data.get("psid") as string,
            data.get("status") as string
        );
    } else {
        return {
            status: 400,
            msg: "invalid request",
            data: "",
        };
    }
};
