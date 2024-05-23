import { z } from "zod";
import { emailSchema, phoneSchema, postSchema } from "./utilSchema";

export const clientSchema = z.object({
    cid: z.string().default(""),
    first_name: z.string().trim().default(""),
    last_name: z.string().trim().default(""),
    phone: phoneSchema,
    email: emailSchema,
    address: z.string().trim().nullable().default(""),
    suburb: z.string().trim().nullable().default(""),
    city: z.string().trim().nullable().default(""),
    state: z.string().trim().nullable().default(""),
    country: z.string().trim().nullable().default("Australia"),
    postcode: postSchema,
});

export const clientNoIDSchema = clientSchema.omit({ cid: true });

export type Tclient = z.infer<typeof clientSchema>;
export type TclientUnreg = z.infer<typeof clientNoIDSchema>;
