import { z } from "zod";

export const serviceSchema = z.object({
    id: z.number().default(0),
    service: z.string().trim().default(""),
    unit: z.string().trim().default(""),
    unit_price: z.number().min(0).default(0),
});

export const unitSchema = z.object({
    id: z.number().default(0),
    unit_name: z.string().trim().default(""),
});

export const companySchema = z.object({
    id: z.number().default(-1),
    name: z.string().trim().default(""),
    bld: z.string().trim().default(""),
    phone: z.string().trim().default(""),
    email: z.string().trim().default(""),
    address: z.string().trim().default(""),
    abn: z.string().trim().default(""),
    bsb: z.string().trim().default(""),
    acc: z.string().trim().default(""),
    deposit_rate: z.number().min(0).default(0),
});

export const newServiceSchema = serviceSchema.omit({ id: true });
export const newUnitSchema = unitSchema.omit({ id: true });
export type TnewUnit = z.infer<typeof newUnitSchema>;
export type TnewService = z.infer<typeof newServiceSchema>;
export type Tservice = z.infer<typeof serviceSchema>;
export type Tunit = z.infer<typeof unitSchema>;
export type Tcompany = z.infer<typeof companySchema>;
