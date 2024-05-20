import { z } from "zod";

export const clientSchema = z.object({
    cid: z.string().default(""),
    first_name: z.string().trim().default(""),
    last_name: z.string().trim().default(""),
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
        })
        .default("123"),
    email: z
        .string()
        .email()
        .trim()
        .toLowerCase()
        .default("your_email@email.com"),
    address: z.string().trim().nullable().default(""),
    suburb: z.string().trim().nullable().default(""),
    city: z.string().trim().nullable().default(""),
    state: z.string().trim().nullable().default(""),
    country: z.string().trim().nullable().default("Australia"),
    postcode: z
        .string()
        //match 4 digits string which may start with 0
        .regex(/^[0-9]{4}$/, { message: "Must be numbers" })
        .min(4)
        .max(4)
        .nullable()
        .default("5000"),
});

export const clientNoIDSchema = clientSchema.omit({ cid: true });

export type Tclient = z.infer<typeof clientSchema>;
export type TclientUnreg = z.infer<typeof clientNoIDSchema>;
