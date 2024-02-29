import { z } from "zod";

const workLogSchema = z.object({
    wlid: z.string(),
    fk_oid: z.string(),
    fk_uid: z.string(),
    wl_date: z.string().datetime(),
    s_time: z.string().datetime().nullable(),
    e_time: z.string().datetime().nullable(),
    b_time: z.string().datetime().nullable(),
    wl_status: z.string().trim().default("ongoing"),
    wl_note: z.string().trim().nullable(),
});

export const assignedWorkSchema = workLogSchema.extend({
    first_name: z.string(),
    last_name: z.string(),
    phone: z
        .string()
        .trim()
        .min(3, { message: "Phone number is too short" })
        .transform((val) => {
            if (val.length > 6) {
                return `${val.slice(0, 3)}-${val.slice(3, 6)}-${val.slice(6)}`;
            } else if (val.length > 3) {
                return `${val.slice(0, 3)}-${val.slice(3)}`;
            } else {
                return val;
            }
        }),
    email: z.string().email().trim().toLowerCase(),
    role: z.string().trim(),
});

export const workLogsSchema = z.object({
    fk_oid: z.string(),
    wl_date: z.string().datetime(),
    assigned_work: workLogSchema.array(),
});

/**
 * @description this is only for the form from mJobAssign modal
 */
export const formWorkLogs = z.object({
    work_logs: workLogSchema.array(),
});

export type TworkLog = z.infer<typeof workLogSchema>;
export type TassignedWork = z.infer<typeof assignedWorkSchema>;
export type TworkLogs = z.infer<typeof workLogsSchema>;
export type TformWorkLogs = z.infer<typeof formWorkLogs>;
