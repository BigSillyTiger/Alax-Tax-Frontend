import { z } from "zod";
import { clientSchema } from "./clientSchema";
import { orderServiceSchema } from "./orderServiceSchema";
import { ORDER_STATUS } from "../utils/setting";

export const plainOrderSchema = z.object({
    oid: z.string().default(""),
    fk_cid: z.string().default(""),
    archive: z.boolean().default(false),
    status: z.string().trim().default(ORDER_STATUS[0]), // pending
    gst: z.number().default(0),
    net: z.number().default(0),
    total: z.number().default(0),
    paid: z.number().default(0),
    created_date: z
        .string()
        .datetime()
        .nullable()
        .default(new Date().toISOString()),
    q_deposit: z.number().default(0),
    q_valid: z.number().default(15),
    q_date: z.string().datetime().nullable().default(new Date().toISOString()),
    i_date: z.string().datetime().nullable().default(null),
    note: z.string().trim().default(""),
});

export const orderAbstractSchema = plainOrderSchema
    .pick({
        oid: true,
        fk_cid: true,
        address: true,
        suburb: true,
        city: true,
        state: true,
        country: true,
        postcode: true,
        status: true,
    })
    .merge(
        clientSchema.pick({ first_name: true, last_name: true, phone: true })
    );

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
        created_date: true,
        paid: true,
        i_date: true,
    })
    .extend({
        order_services: orderServiceSchema
            .omit({
                fk_oid: true,
                created_date: true,
            })
            .array(),
    });

export const orderWithClientSchema = plainOrderSchema.extend({
    client_info: clientSchema.default({
        email: "you_email@email.com",
        phone: "123",
        postcode: "5000",
    }),
    order_services: orderServiceSchema.array().default([]),
    payments: orderPaymentSchema.array().default([]),
});

export type TorderWithClient = z.infer<typeof orderWithClientSchema>;
export type TorderForm = z.infer<typeof orderFormSchema>;
export type TorderService = z.infer<typeof orderServiceSchema>;
export type TorderPayment = z.infer<typeof orderPaymentSchema>;
export type TorderAbstract = z.infer<typeof orderAbstractSchema>;
export type Tpayment = {
    payments: TorderPayment[];
};
