import { z } from "zod";
import { roleOptions } from "../utils";

export const staffSchema = z.object({
    uid: z.string().default(""),
    first_name: z.string().trim().default(""),
    last_name: z.string().trim().default(""),
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
        .nullable()
        .default(null),
    email: z.string().email().trim().toLowerCase().nullable().default(null),
    password: z.string().default(""),
    address: z.string().trim().nullable().default(""),
    suburb: z.string().trim().nullable().default("Adelaide"),
    city: z.string().trim().nullable().default("Adelaide"),
    state: z.string().trim().nullable().default("SA"),
    country: z.string().trim().nullable().default("Australia"),
    postcode: z
        .string()
        //match 4 digits string which may start with 0
        .regex(/^[0-9]{4}$/, { message: "Must be numbers" })
        .min(4)
        .max(4)
        .nullable()
        .default("5000"),
    role: z.string().trim().default("employee"),
    dashboard: z.number().default(roleOptions.employee.dashboard),
    clients: z.number().default(roleOptions.employee.clients),
    orders: z.number().default(roleOptions.employee.orders),
    worklogs: z.number().default(roleOptions.employee.worklogs),
    calendar: z.number().default(roleOptions.employee.calendar),
    staff: z.number().default(roleOptions.employee.staff),
    setting: z.number().default(roleOptions.employee.setting),
    //created_date: z.string().trim().nullable(),
});

export const staffForm = staffSchema
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

export const staffUpdate = staffSchema.omit({ uid: true, password: true });

export const adminStore = staffSchema.omit({
    email: true,
    phone: true,
    password: true,
    address: true,
    suburb: true,
    city: true,
    state: true,
    country: true,
    postcode: true,
});

/**
 * @description for staff list, only used like: assignment modal
 */
export const staffList = staffSchema
    .omit({
        password: true,
        dashboard: true,
        clients: true,
        orders: true,
        worklogs: true,
        calendar: true,
        staff: true,
        setting: true,
    })
    .array();

export type Tstaff = z.infer<typeof staffSchema>;
export type TstaffForm = z.infer<typeof staffForm>;
export type TstaffUpdate = z.infer<typeof staffUpdate>;
export type TadminStore = z.infer<typeof adminStore>;
export type TstaffList = z.infer<typeof staffList>;
