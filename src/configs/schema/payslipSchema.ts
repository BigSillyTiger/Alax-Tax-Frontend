import { z } from "zod";
import { deductionSchema } from "./workSchema";

export const payslipSchema = z.object({
    psid: z.string().default(""),
    fk_uid: z.string().default(""),
    created_date: z.string().default(""),
    status: z.literal("pending").or(z.literal("paid")).default("pending"),
    hr: z.number().default(0),
    paid: z.number().default(0),
    s_date: z.string().default(""),
    e_date: z.string().default(""),
    archive: z.boolean().default(false),
});

const bonusSchema = z.object({
    fk_psid: z.string().default(""),
    fk_uid: z.string().default(""),
    note: z.string().trim().nullable().default(""),
    amount: z.number().multipleOf(0.01).default(0),
});

const payslipsSchema = payslipSchema.extend({
    bonus: bonusSchema.array().default([]),
    deduction: deductionSchema.array().default([]),
});

export type Tpayslip = z.infer<typeof payslipSchema>;
export type Tpayslips = z.infer<typeof payslipsSchema>;
export type Tbonus = z.infer<typeof bonusSchema>;
