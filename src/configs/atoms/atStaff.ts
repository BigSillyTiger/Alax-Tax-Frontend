import { atomWithReset } from "jotai/utils";
import { Tstaff, staffSchema } from "@/configs/schema/staffSchema";

const initStaff: Tstaff = staffSchema.parse({});

const atStaff = atomWithReset<Tstaff>(staffSchema.parse({}));
const atAllStaff = atomWithReset<Tstaff[]>([]);

const atRoleSelected = atomWithReset<"employee" | "manager">("employee");

export { initStaff, atStaff, atRoleSelected, atAllStaff };
