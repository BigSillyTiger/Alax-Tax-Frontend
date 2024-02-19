import { z } from "zod";
import { clientSchema } from "./clientSchema";

export const plainOrderSchema = z.object({
    order_id: z.string(),
    fk_client_id: z.string(),
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
    invoice_issue_date: z.string().datetime(),
});

export const oderServiceSchema = z.object({
    fk_order_id: z.string(),
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
    fk_order_id: z.number(),
    paid: z.number(),
    paid_date: z.string().datetime(),
});

/**
 * @description an order can have multiple services descriptions
 * and an order must have at least one service description
 */
/* export const oderWithServicesSchema = plainOrderSchema.extend({
    order_services: oderServiceSchema.array(),
});
 */
/**
 * @description for order page table displaying
 * this page will display 2 more columns: full name / phone
 */
/* export const totalOrderSchema = oderWithServicesSchema.extend({
    client_info: clientSchema,
}); */

/**
 * @description for order form modal
 * only contain: client info, order info, and order services
 */
export const orderFormSchema = plainOrderSchema
    .omit({
        order_id: true,
        fk_client_id: true,
        //order_status: true,
        order_date: true,
        order_paid: true,
        quotation_date: true,
        invoice_issue_date: true,
        invoice_update_date: true,
    })
    .extend({
        order_services: oderServiceSchema
            .omit({
                fk_order_id: true,
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
