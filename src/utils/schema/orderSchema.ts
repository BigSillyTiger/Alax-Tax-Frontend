import { z } from "zod";

export const orderSchema = z.object({
    order_id: z.number(),
    fk_client_id: z.number(),
    fk_invoice_id: z.number(),
    order_address: z.string().trim().nullable(),
    order_suburb: z.string().trim().nullable(),
    order_city: z.string().trim().nullable(),
    order_state: z.string().trim().nullable(),
    order_country: z.string().trim().nullable(),
    order_pc: z
        .string()
        //match 4 digits string which may start with 0
        .regex(/^[0-9]{4}$/, { message: "Must be numbers" })
        .min(4)
        .max(4)
        .nullable(),
    order_status: z.string().trim(),
    order_gst: z.number(),
    order_total: z.number(),
    order_deposit: z.number(),
    order_date: z.string().datetime().nullable(),
    quotation_date: z.string().datetime().nullable(),
    invoice_issue_date: z.string().datetime().nullable(),
    invoice_update_date: z.string().datetime().nullable(),
});

export const oderDescSchema = z.object({
    des_id: z.number(),
    fk_order_id: z.number(),
    ranking: z.number(),
    title: z.string().trim(),
    taxable: z.boolean(),
    description: z.string().trim(),
    qty: z.number(),
    unit: z.string().trim(),
    unit_price: z.number(),
    gst: z.number(),
    netto: z.number(),
});

export const orderWithDescSchema = orderSchema.extend({
    order_desc: oderDescSchema.array(),
});

export const newOrderDescSchema = oderDescSchema.omit({
    des_id: true,
    fk_order_id: true,
    ranking: true,
});

export const OrderFormSchema = orderSchema
    .omit({
        order_id: true,
        fk_client_id: true,
        fk_invoice_id: true,
        order_status: true,
        order_date: true,
    })
    .extend({
        order_desc: newOrderDescSchema.array(),
    });

export type Torder = z.infer<typeof orderSchema>;
export type TorderForm = z.infer<typeof OrderFormSchema>;
export type TorderWithDesc = z.infer<typeof orderWithDescSchema>;
export type TorderDesc = z.infer<typeof oderDescSchema>;
export type TnewOrderDesc = z.infer<typeof newOrderDescSchema>;
