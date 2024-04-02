import { z } from "zod";

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
    bsid: z.string().default(""),
    fk_psid: z.string().default(""),
    fk_uid: z.string().default(""),
    bs_note: z.string().trim().nullable().default(""),
    amount: z.number().default(0),
});

const deductionSchema = z.object({
    did: z.string().default(""),
    fk_psid: z.string().default(""),
    fk_uid: z.string().default(""),
    bs_note: z.string().trim().nullable().default(""),
    amount: z.number().default(0),
});

const payslipsSchema = payslipSchema.extend({
    bonus: bonusSchema.array().default([]),
    deduction: deductionSchema.array().default([]),
});

export type Tpayslips = z.infer<typeof payslipsSchema>;
