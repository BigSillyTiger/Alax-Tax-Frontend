import { z } from "zod";

export const clientSchema = z.object({
    id: z.number().optional(),
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
    email: z.string().email().trim().toLowerCase(),
    address: z.string().trim().nullable(),
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
});

export const clientViewSchema = clientSchema
    .pick({
        id: true,
        phone: true,
        email: true,
        address: true,
        city: true,
        state: true,
        contry: true,
        postcode: true,
    })
    .extend({ full_name: z.string().trim() });

export type TclientSchema = z.infer<typeof clientSchema>;
export type TclientViewSchema = z.infer<typeof clientViewSchema>;
