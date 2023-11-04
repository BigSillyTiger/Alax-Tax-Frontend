import { z } from "zod";

export const orderSchema = z.object({
    order_id: z.number(),
    fk_client_id: z.number(),
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
    order_paid: z.number(),
    order_deposit: z.number(),
    order_date: z.string().datetime().nullable(),
    quotation_date: z.string().datetime().nullable(),
    invoice_issue_date: z.string().datetime().nullable(),
    invoice_update_date: z.string().datetime().nullable(),
});

export const oderDescSchema = z.object({
    des_id: z.number(),
    fk_order_id: z.number(),
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
});

export const orderFormSchema = orderSchema
    .omit({
        order_id: true,
        fk_client_id: true,
        order_status: true,
        order_date: true,
        order_paid: true,
        quotation_date: true,
        invoice_issue_date: true,
        invoice_update_date: true,
    })
    .extend({
        order_desc: newOrderDescSchema.array(),
    });

export const orderPaymentSchema = z.object({
    fk_order_id: z.number(),
    pay_id: z.number(),
    paid: z.number(),
    paid_date: z.string().datetime(),
});

export const orderWithDetailsSchema = orderWithDescSchema.extend({
    payments: orderPaymentSchema.array(),
});

export type Torder = z.infer<typeof orderSchema>;
export type TorderForm = z.infer<typeof orderFormSchema>;
export type TorderWithDesc = z.infer<typeof orderWithDescSchema>;
export type TorderDesc = z.infer<typeof oderDescSchema>;
export type TnewOrderDesc = z.infer<typeof newOrderDescSchema>;
export type TorderPayment = z.infer<typeof orderPaymentSchema>;
export type TorderWithDetails = z.infer<typeof orderWithDetailsSchema>;
