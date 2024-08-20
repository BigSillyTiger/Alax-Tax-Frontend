import { z } from "zod";
import { ORDER_STATUS, PRODUCT_NAME, SERVICE_TYPE } from "../utils/setting";

export const orderServiceSchema = z.object({
    osid: z.string().default(""),
    fk_cid: z.string().default(""),
    fk_oid: z.string().default(""),
    status: z.string().default(ORDER_STATUS[0]), // pending
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
    expiry_date: z.string().default("none"),
    service_type: z.string().trim().default(SERVICE_TYPE[0]), // OOP
    product_name: z.string().trim().default(PRODUCT_NAME[0]), // product 1
});

export type TorderService = z.infer<typeof orderServiceSchema>;
