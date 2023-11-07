import { z } from "zod";

export const companySchema = z.object({
    name: z.string().trim(),
    address: z.string().trim().nullable(),
    BLD: z.string().trim(),
    phone: z.string().trim(),
    ABN: z.string().trim(),
    BSB: z.string().trim(),
    account: z.string().trim(),
});

export type Tcompany = z.infer<typeof companySchema>;
