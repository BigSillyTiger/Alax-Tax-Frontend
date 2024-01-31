import { z } from "zod";

export const staffSchema = z.object({
    uid: z.number(),
    first_name: z.string().trim(),
    last_name: z.string().trim(),
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
    password: z.string(),
    address: z.string().trim().nullable(),
    suburb: z.string().trim().nullable(),
    city: z.string().trim().nullable(),
    state: z.string().trim().nullable(),
    country: z.string().trim().nullable(),
    postcode: z
        .string()
        //match 4 digits string which may start with 0
        .regex(/^[0-9]{4}$/, { message: "Must be numbers" })
        .min(4)
        .max(4)
        .nullable(),
    role: z.string().trim(),
    //created_date: z.string().trim().nullable(),
});

export const staffNoIDSchema = staffSchema.omit({ uid: true });

export const staffWithAdminSchema = staffSchema.extend({
    dashboard: z.number(),
    clients: z.number(),
    orders: z.number(),
    calendar: z.number(),
    staff: z.number(),
    setting: z.number(),
});

export const staffUnregWithAdmin = staffWithAdminSchema
    .omit({
        uid: true,
    })
    .extend({
        pwConfirm: z.string(),
    })
    .superRefine(({ pwConfirm, password }, ctx) => {
        if (pwConfirm !== password) {
            ctx.path.push("pwConfirm");
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match.",
            });
        }
    });

export type Tstaff = z.infer<typeof staffSchema>;
export type TstaffUnreg = z.infer<typeof staffNoIDSchema>;
export type TstaffWithAdmin = z.infer<typeof staffWithAdminSchema>;
export type TstaffUnregWithAdmin = z.infer<typeof staffUnregWithAdmin>;
