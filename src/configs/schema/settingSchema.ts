import { z } from "zod";

export const serviceSchema = z.object({
    id: z.number(),
    service: z.string().trim(),
    unit: z.string().trim(),
    unit_price: z.number().min(0),
    //unit_price: z.string().trim(),
});

export const unitSchema = z.object({
    id: z.number(),
    unit_name: z.string().trim(),
});

export const companySchema = z.object({
    id: z.number(),
    name: z.string().trim(),
    bld: z.string().trim(),
    phone: z.string().trim(),
    email: z.string().trim(),
    address: z.string().trim(),
    abn: z.string().trim(),
    bsb: z.string().trim(),
    acc: z.string().trim(),
});

export const newServiceSchema = serviceSchema.omit({ id: true });
export const newUnitSchema = unitSchema.omit({ id: true });
export type TnewUnit = z.infer<typeof newUnitSchema>;
export type TnewService = z.infer<typeof newServiceSchema>;
export type Tservice = z.infer<typeof serviceSchema>;
export type Tunit = z.infer<typeof unitSchema>;
export type Tcompany = z.infer<typeof companySchema>;
