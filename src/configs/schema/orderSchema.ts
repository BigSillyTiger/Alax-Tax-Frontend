import { z } from "zod";
import { clientSchema } from "./clientSchema";
import { wlUnionSchema } from "./workSchema";
import i18n from "@/configs/i18n";

export const plainOrderSchema = z.object({
    oid: z.string().default(""),
    fk_cid: z.string().default(""),
    address: z.string().trim().nullable().default(""),
    suburb: z.string().trim().nullable().default(""),
    city: z.string().trim().nullable().default("Adelaide"),
    state: z.string().trim().nullable().default("SA"),
    country: z.string().trim().nullable().default("Australia"),
    postcode: z
        .string()
        //match 4 digits string which may start with 0
        .regex(/^[0-9]{4}$/, { message: "Must be numbers" })
        .min(4)
        .max(4)
        .nullable()
        .default("5000"),
    status: z.string().trim().default(i18n.t("label.pending")),
    gst: z.number().default(0),
    total: z.number().default(0),
    paid: z.number().default(0),
    deposit: z.number().default(0),
    created_date: z
        .string()
        .datetime()
        .nullable()
        .default(new Date().toISOString()),
    quotation_date: z.string().datetime().nullable().default(null),
    invoice_date: z.string().datetime().nullable().default(null),
});

export const orderServiceSchema = z.object({
    fk_oid: z.string().default(""),
    ranking: z.number().default(0),
    title: z.string().trim().default(""),
    taxable: z.boolean().default(true),
    description: z.string().trim().default(""),
    qty: z.number().default(1),
    unit: z.string().trim().default(""),
    unit_price: z.number().default(0),
    gst: z.number().default(0),
    netto: z.number().default(0),
});

export const orderPaymentSchema = z.object({
    pid: z.string(),
    fk_oid: z.string(),
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
        order_services: orderServiceSchema
            .omit({
                fk_oid: true,
            })
            .array(),
    });

export const orderSchema = plainOrderSchema.extend({
    client_info: clientSchema.default({
        email: "you_email@email.com",
        phone: "123",
        postcode: "5000",
    }),
    order_services: orderServiceSchema.array().default([]),
    payments: orderPaymentSchema.array().default([]),
    work_logs: wlUnionSchema.array().default([]),
});

export type Torder = z.infer<typeof orderSchema>;
export type TorderForm = z.infer<typeof orderFormSchema>;
export type TorderService = z.infer<typeof orderServiceSchema>;
export type TorderPayment = z.infer<typeof orderPaymentSchema>;
