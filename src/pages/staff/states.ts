import { atomWithReset } from "jotai/utils";
import { TstaffWithAdmin } from "@/configs/schema/staffSchema";

const initStaff: TstaffWithAdmin = {
    uid: -1,
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
    dashboard: 2,
    clients: 0,
    orders: 0,
    calendar: 1,
    staff: 0,
    setting: 0,
};

const atStaff = atomWithReset<TstaffWithAdmin>(initStaff);

const atRoleSelected = atomWithReset<"employee" | "manager">("employee");

export { initStaff, atStaff, atRoleSelected };
