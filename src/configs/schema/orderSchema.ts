import { z } from "zod";

export const orderSchema = z.object({
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

/**
 * @description an order can have multiple services descriptions
 * and an order must have at least one service description
 */
export const oderWithServicesSchema = orderSchema.extend({
    order_services: oderServiceSchema.array(),
});

/**
 * @description for order page table displaying
 * this page will display 2 more columns: full name / phone
 */
export const totalOrderSchema = oderWithServicesSchema.extend({
    first_name: z.string().trim(),
    last_name: z.string().trim(),
    phone: z
        .string()
        .trim()
        .min(3, { message: "Phone number is too short" })
        .transform((val) => {
            if (val.length > 6) {
                return `${val.slice(0, 3)}-${val.slice(3, 6)}-${val.slice(6)}`;
            } else if (val.length > 3) {
                return `${val.slice(0, 3)}-${val.slice(3)}`;
            } else {
                return val;
            }
        }),
});

/**
 * @description for order form modal
 */
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
        order_services: oderServiceSchema
            .omit({
                fk_order_id: true,
            })
            .array(),
    });

export const orderPaymentSchema = z.object({
    fk_order_id: z.number(),
    paid: z.number(),
    paid_date: z.string().datetime(),
});

export const orderWithPaymentsSchema = oderWithServicesSchema.extend({
    payments: orderPaymentSchema.array(),
});

export type Torder = z.infer<typeof orderSchema>;
export type TorderForm = z.infer<typeof orderFormSchema>;
export type TorderWithDesc = z.infer<typeof oderWithServicesSchema>;
export type TorderDesc = z.infer<typeof oderServiceSchema>;
export type TorderPayment = z.infer<typeof orderPaymentSchema>;
export type TorderWithPayments = z.infer<typeof orderWithPaymentsSchema>;
export type TtotalOrder = z.infer<typeof totalOrderSchema>;
