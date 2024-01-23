import { z } from "zod";

export const staffSchema = z.object({
    uid: z.number(),
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
    role: z.string().trim().nullable(),
    //created_date: z.string().trim().nullable(),
});

export const staffNoIDSchema = staffSchema.omit({ uid: true });

export type Tstaff = z.infer<typeof staffSchema>;
export type TstaffUnreg = z.infer<typeof staffNoIDSchema>;
