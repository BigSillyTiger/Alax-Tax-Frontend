import { atomWithReset } from "jotai/utils";
import { Tstaff, staffSchema } from "@/configs/schema/staffSchema";
import { TstaffRole } from "@/configs/types";
import { defaultStaffRole } from "../utils/staff";

const initStaff: Tstaff = staffSchema.parse({});

const atStaff = atomWithReset<Tstaff>(staffSchema.parse({}));
const atAllStaff = atomWithReset<Tstaff[]>([]);

const atRoleSelected = atomWithReset<TstaffRole>(defaultStaffRole);

export { initStaff, atStaff, atRoleSelected, atAllStaff };
