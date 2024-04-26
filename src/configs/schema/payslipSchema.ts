import { z } from "zod";
import { deductionSchema } from "./workSchema";

export const payslipSchema = z.object({
    psid: z.string().default(""),
    fk_uid: z.string().default(""),
    created_date: z.string().default(""),
    status: z.literal("pending").or(z.literal("completed")).default("pending"),
    hr: z.number().default(25),
    paid: z.number().default(0),
    s_date: z.string().default(""),
    e_date: z.string().default(""),
    archive: z.boolean().default(false),
    company_name: z.string().default(""),
    company_addr: z.string().default(""),
    company_phone: z.string().default(""),
    staff_name: z.string().default(""),
    staff_addr: z.string().default(""),
    staff_phone: z.string().default(""),
    staff_email: z.string().default(""),
    staff_bsb: z.string().default(""),
    staff_acc: z.string().default(""),
});

const bonusSchema = z.object({
    fk_psid: z.string().default(""),
    fk_uid: z.string().default(""),
    note: z.string().trim().nullable().default(""),
    amount: z.number().multipleOf(0.01).default(0),
});

const payslipWBDSchema = payslipSchema.extend({
    bonus: bonusSchema.array().default([]),
    deduction: deductionSchema.array().default([]),
});

export type Tpayslip = z.infer<typeof payslipSchema>;
export type TpayslipWBD = z.infer<typeof payslipWBDSchema>;
export type Tbonus = z.infer<typeof bonusSchema>;
