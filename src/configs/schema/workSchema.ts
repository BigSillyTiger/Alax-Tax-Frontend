import { z } from "zod";

export const workSchema = z.object({
    wid: z.string(),
    fk_oid: z.string(),
    fk_uid: z.string(),
    w_date: z.string().datetime(),
    s_time: z.string().datetime().nullable(),
    e_time: z.string().datetime().nullable(),
    w_status: z.string().trim().default("ongoing"),
    work_note: z.string().trim().nullable(),
});

export const workLogsSchema = z.object({
    fk_oid: z.string(),
    wl_date: z.string().datetime(),
    logs: workSchema
        .extend({
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
        })
        .array(),
});

export type Twork = z.infer<typeof workSchema>;
export type TworkLogs = z.infer<typeof workLogsSchema>;
