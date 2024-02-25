import { z } from "zod";
import { clientSchema } from "./clientSchema";

export const plainOrderSchema = z.object({
    oid: z.string(),
    fk_cid: z.string(),
    address: z.string().trim().nullable(),
    suburb: z.string().trim().nullable(),
    city: z.string().trim().nullable(),
    state: z.string().trim().nullable(),
    country: z.string().trim().nullable(),
    postcode: z
        .string()
        //match 4 digits string which may start with 0
        .regex(/^[0-9]{4}$/, { message: "Must be numbers" })
        .min(4)
        .max(4)
        .nullable(),
    status: z.string().trim(),
    gst: z.number(),
    total: z.number(),
    paid: z.number(),
    deposit: z.number(),
    created_date: z.string().datetime().nullable(),
    quotation_date: z.string().datetime().nullable(),
    invoice_date: z.string().datetime(),
});

export const oderServiceSchema = z.object({
    fk_oid: z.string(),
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

export const orderPaymentSchema = z.object({
    fk_oid: z.number(),
    paid: z.number(),
    paid_date: z.string().datetime(),
});

/**
 * @description for order form modal
 * only contain: client info, order info, and order services
 */
export const orderFormSchema = plainOrderSchema
    .omit({
        oid: true,
        fk_cid: true,
        //status: true,
        created_date: true,
        paid: true,
        quotation_date: true,
        invoice_date: true,
        invoice_update_date: true,
    })
    .extend({
        order_services: oderServiceSchema
            .omit({
                fk_oid: true,
            })
            .array(),
    });

export const orderSchema = plainOrderSchema.extend({
    client_info: clientSchema,
    order_services: oderServiceSchema.array(),
    payments: orderPaymentSchema.array(),
});

export type Torder = z.infer<typeof orderSchema>;
export type TorderForm = z.infer<typeof orderFormSchema>;
export type TorderService = z.infer<typeof oderServiceSchema>;
export type TorderPayment = z.infer<typeof orderPaymentSchema>;
//export type TtotalOrder = z.infer<typeof totalOrderSchema>;
