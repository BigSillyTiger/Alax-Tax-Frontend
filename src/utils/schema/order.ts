import { z } from "zod";

export const orderSchema = z.object({
    order_id: z.number(),
    fk_client_id: z.number(),
    fk_invoice_id: z.number(),
    order_address: z.string().trim(),
    order_city: z.string().trim(),
    order_state: z.string().trim(),
    order_country: z.string().trim(),
    order_pc: z
        .string()
        //match 4 digits string which may start with 0
        .regex(/^[0-9]{4}$/, { message: "Must be numbers" })
        .min(4)
        .max(4)
        .nullable(),
    order_status: z.string().trim(),
    order_date: z.string().datetime(),
});

export const newOrderSchema = orderSchema.omit({
    order_id: true,
    fk_invoice_id: true,
    order_status: true,
    order_date: true,
});

export const oderDescSchema = z.object({
    des_id: z.number(),
    fk_order_id: z.number(),
    ranking: z.number(),
    description: z.string().trim(),
    qty: z.number(),
    unit: z.string().trim(),
    unit_price: z.number(),
    netto: z.number(),
});

export const newOrderDescSchema = oderDescSchema.omit({ des_id: true });

export type Torder = z.infer<typeof orderSchema>;
export type TnewOrder = z.infer<typeof newOrderSchema>;
export type TorderDesc = z.infer<typeof oderDescSchema>;
export type TnewOrderDesc = z.infer<typeof newOrderDescSchema>;
