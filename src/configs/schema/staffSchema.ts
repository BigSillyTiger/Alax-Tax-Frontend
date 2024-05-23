import { z } from "zod";
import { defaultStaffRole } from "../utils/staff";
import { payslipSchema } from "./payslipSchema";
import { roleOptions, staffStandardHR } from "../utils/staff";
import {
    baSchema,
    bsbSchema,
    emailSchema,
    phoneSchema,
    postSchema,
} from "./utilSchema";

export const staffSchema = z.object({
    uid: z.string().default(""),
    first_name: z.string().trim().default(""),
    last_name: z.string().trim().default(""),
    phone: phoneSchema,
    email: emailSchema,
    password: z.string().default(""),
    address: z.string().trim().nullable().default(""),
    suburb: z.string().trim().nullable().default("Adelaide"),
    city: z.string().trim().nullable().default("Adelaide"),
    state: z.string().trim().nullable().default("SA"),
    country: z.string().trim().nullable().default("Australia"),
    postcode: postSchema,
    role: z.string().trim().default(defaultStaffRole),
    access: z.boolean().default(true),
    dashboard: z.number().default(roleOptions[defaultStaffRole].dashboard),
    clients: z.number().default(roleOptions[defaultStaffRole].clients),
    orders: z.number().default(roleOptions[defaultStaffRole].orders),
    worklogs: z.number().default(roleOptions[defaultStaffRole].worklogs),
    calendar: z.number().default(roleOptions[defaultStaffRole].calendar),
    staff: z.number().default(roleOptions[defaultStaffRole].staff),
    setting: z.number().default(roleOptions[defaultStaffRole].setting),
    //created_date: z.string().trim().nullable(),
    hr: z.number().default(staffStandardHR),
    bsb: bsbSchema,
    account: baSchema,
});

export const staffWPayslipSchema = staffSchema.extend({
    payslips: payslipSchema.partial().array().default([]),
});

export const staffFormSchema = staffSchema
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

export const adminSchema = staffSchema.pick({
    uid: true,
    first_name: true,
    last_name: true,
    access: true,
    role: true,
    dashboard: true,
    clients: true,
    orders: true,
    worklogs: true,
    calendar: true,
    staff: true,
    setting: true,
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
export type TstaffForm = z.infer<typeof staffFormSchema>;
export type TstaffUpdate = z.infer<typeof staffUpdate>;
export type Tadmin = z.infer<typeof adminSchema>;
export type TstaffList = z.infer<typeof staffList>;
export type TstaffWPayslip = z.infer<typeof staffWPayslipSchema>;
