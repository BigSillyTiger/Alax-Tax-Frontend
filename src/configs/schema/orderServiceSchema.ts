import { z } from "zod";
import i18n from "@/configs/i18n";

export const orderServiceSchema = z.object({
    osid: z.string().default(""),
    fk_oid: z.string().default(""),
    status: z.string().default(i18n.t("label.pending")),
    ranking: z.number().default(0),
    title: z.string().trim().default(""),
    taxable: z.boolean().default(true),
    note: z.string().trim().default(""),
    qty: z.number().default(1),
    unit: z.string().trim().default(""),
    unit_price: z.number().default(0),
    gst: z.number().default(0),
    net: z.number().default(0),
    created_date: z.string().datetime().nullable().default(null),
    expiry_date: z.string().datetime().nullable().default(null),
    service_type: z.string().trim().default(""),
    product_name: z.string().trim().default(""),
});

export type TorderService = z.infer<typeof orderServiceSchema>;
