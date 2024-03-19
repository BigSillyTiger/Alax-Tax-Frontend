import { z } from "zod";

const workLogSchema = z.object({
    wlid: z.string().default(""),
    fk_oid: z.string().default(""),
    fk_uid: z.string().default(""),
    wl_date: z.string().default(""),
    s_time: z
        .string()
        .regex(/^\d{2}:\d{2}$/)
        .default("00:00"),
    e_time: z
        .string()
        .regex(/^\d{2}:\d{2}$/)
        .default("00:00"),
    b_time: z
        .string()
        .regex(/^\d{2}:\d{2}$/)
        .default("00:00"),
    wl_status: z.string().trim().default("ongoing"),
    wl_note: z.string().trim().nullable().default(""),
    confirm_status: z.boolean().default(false),
    archive: z.boolean().default(false),
});

export const assignedWorkSchema = workLogSchema.extend({
    first_name: z.string().default(""),
    last_name: z.string().default(""),
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
        })
        .default("123"),
    email: z
        .string()
        .email()
        .trim()
        .toLowerCase()
        .default("your_email@email.com"),
    role: z.string().trim().default("employee"),
});

export const workLogsSchema = z.object({
    fk_oid: z.string(),
    wl_date: z.string().datetime(),
    assigned_work: assignedWorkSchema.array(),
});

/**
 * @description this is only for the form from mJobAssign modal
 */
export const formWorkLogs = z.object({
    work_logs: workLogSchema.array(),
});

export const wlTableRowSchema = assignedWorkSchema.extend({
    // work site address
    address: z.string().trim().nullable().default(""),
    suburb: z.string().trim().nullable().default(""),
    city: z.string().trim().nullable().default(""),
    state: z.string().trim().nullable().default(""),
    postcode: z.string().trim().nullable().default(""),
});

export type TworkLog = z.infer<typeof workLogSchema>;
export type TassignedWork = z.infer<typeof assignedWorkSchema>;
export type TworkLogs = z.infer<typeof workLogsSchema>;
export type TformWorkLogs = z.infer<typeof formWorkLogs>;
export type TwlTableRow = z.infer<typeof wlTableRowSchema>;
