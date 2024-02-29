import { atomWithReset } from "jotai/utils";
import { Tstaff } from "@/configs/schema/staffSchema";
import { roleOptions } from "@/configs/utils";

const initStaff: Tstaff = {
    uid: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    suburb: "Adelaide",
    city: "Adelaide",
    state: "SA",
    country: "Australia",
    postcode: "5000",
    role: "employee",
    dashboard: roleOptions.employee.dashboard,
    clients: roleOptions.employee.clients,
    orders: roleOptions.employee.orders,
    calendar: roleOptions.employee.calendar,
    staff: roleOptions.employee.staff,
    setting: roleOptions.employee.setting,
};

const atStaff = atomWithReset<Tstaff>(initStaff);
const atAllStaff = atomWithReset<Tstaff[]>([]);

const atRoleSelected = atomWithReset<"employee" | "manager">("employee");

export { initStaff, atStaff, atRoleSelected, atAllStaff };
