import { z } from "zod";
import { ORDER_STATUS } from "../utils/setting";
import { DEFAULT_EXPIRY_DATE } from "../utils/literals";

export const serviceSchema = z.object({
    csid: z.string().default(""),
    fk_cid: z.string().default(""),
    title: z.string().trim().default(""),
    service_type: z.string().trim().default(""),
    product_name: z.string().trim().default(""),
    status: z.string().default(ORDER_STATUS[0]), // pending
    created_date: z.string().datetime().nullable().default(null),
    expiry_date: z.string().default(DEFAULT_EXPIRY_DATE),
    archive: z.boolean().default(false),
    note: z.string().trim().default(""),
});

export type TclientService = z.infer<typeof serviceSchema>;
