import { z } from "zod";
import { WL_STATUS } from "../utils/setting";
import { defaultStaffRole } from "../utils/staff";

const statusLiterals = WL_STATUS.map((status) => z.literal(status));

export function isValidZodLiteralUnion<T extends z.ZodLiteral<unknown>>(
    literals: T[]
): literals is [T, T, ...T[]] {
    return literals.length >= 2;
}
export function constructZodLiteralUnionType<T extends z.ZodLiteral<unknown>>(
    literals: T[]
) {
    if (!isValidZodLiteralUnion(literals)) {
        throw new Error(
            "Literals passed do not meet the criteria for constructing a union schema, the minimum length is 2"
        );
    }
    return z.union(literals);
}

const workLogSchema = z.object({
    wlid: z.string().default(""),
    fk_oid: z.string().default(""),
    fk_uid: z.string().default(""),
    fk_psid: z.string().nullable().default(""),
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
    b_hour: z
        .string()
        .regex(/^\d{2}:\d{2}$/)
        .default("00:00"),
    /* wl_status: z
        .union([
            z.literal("pending"),
            z.literal("ongoing"),
            z.literal("cancelled"),
            z.literal("processing"),
            z.literal("confirmed"),
            z.literal("resting"),
            z.literal("paid"),
        ])
        .default("pending"), */
    wl_status: constructZodLiteralUnionType(statusLiterals).default("pending"),
    wl_note: z.string().trim().nullable().default(""),
    confirm_status: z.boolean().default(false),
    archive: z.boolean().default(false),
});

export const worklogAbstractSchema = workLogSchema
    .pick({
        wlid: true,
        fk_oid: true,
        fk_uid: true,
        wl_date: true,
        wl_note: true,
    })
    .extend({
        first_name: z.string().default(""),
        last_name: z.string().default(""),
        role: z.string().default("employee"),
    });
// why? this would cause error
//.merge(staffSchema.pick({ first_name: true, last_name: true, role: true }));

export const deductionSchema = z.object({
    did: z.string().default(""),
    fk_wlid: z.string().default(""),
    note: z.string().trim().nullable().default(""),
    amount: z.number().multipleOf(0.01).default(0),
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
    role: z.string().trim().default(defaultStaffRole),
    hr: z.number().default(25),
    deduction: deductionSchema.array().default([]),
});

export const wlUnionSchema = z.object({
    fk_oid: z.string(),
    wl_date: z.string().datetime(),
    assigned_work: assignedWorkSchema.array(),
});

/**
 * @description this is only for the form from mJobAssign modal / not used
 */
export const formWorkLogs = z.object({
    wlUnion: workLogSchema.array(),
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
export type TwlUnion = z.infer<typeof wlUnionSchema>;
export type TformWorkLogs = z.infer<typeof formWorkLogs>;
export type TwlTableRow = z.infer<typeof wlTableRowSchema>;
export type Tdeduction = z.infer<typeof deductionSchema>;
export type TwlAbstract = z.infer<typeof worklogAbstractSchema>;
