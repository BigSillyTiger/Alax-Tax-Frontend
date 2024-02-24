import { z } from "zod";
import { orderSchema } from "./orderSchema";

export const workSchema = z.object({
    wid: z.string(),
    fk_order_id: z.string(),
    fk_uid: z.string(),
    w_date: z.string().datetime(),
    s_time: z.string().datetime().nullable(),
    e_time: z.string().datetime().nullable(),
    w_status: z.string().trim().default("ongoing"),
    work_note: z.string().trim().nullable(),
});

export const workUnionSchema = z
    .object({
        wuid: z.string(),
        wu_date: z.date(),
    })
    .extend({ work_logs: workSchema.array() });

export const orderWithWorklogs = orderSchema.extend({
    workUnion: workUnionSchema,
});

/**
 * @description for modal to display work assignment, no need to include wid
 */
export const workAssignmentSchema = orderSchema.extend({
    work_logs: workSchema.omit({ wid: true }).array(),
});

export type Twork = z.infer<typeof workSchema>;
export type TworkUnion = z.infer<typeof workUnionSchema>;
export type TworkAssignment = z.infer<typeof workAssignmentSchema>;
export type TorderWithWorklogs = z.infer<typeof orderWithWorklogs>;
