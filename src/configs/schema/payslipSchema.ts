import { z } from "zod";
import { deductionSchema } from "./workSchema";

const payslipSchema = z.object({
    psid: z.string().default(""),
    fk_uid: z.string().default(""),
    created_date: z.string().default(""),
    ps_status: z.literal("pending").or(z.literal("paid")).default("pending"),
    hr: z.number().default(0),
    ps_note: z.string().trim().nullable().default(""),
    s_period: z.string().default(""),
    e_period: z.string().default(""),
    archive: z.boolean().default(false),
});

const bonusSchema = z.object({
    fk_psid: z.string().default(""),
    fk_uid: z.string().default(""),
    note: z.string().trim().nullable().default(""),
    amount: z.number().default(0),
});

const payslipsSchema = payslipSchema.extend({
    bonus: bonusSchema.array().default([]),
    deduction: deductionSchema.array().default([]),
});

export type Tpayslips = z.infer<typeof payslipsSchema>;
export type Tbonus = z.infer<typeof bonusSchema>;
