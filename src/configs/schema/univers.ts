import { z } from "zod";
import React from "react";

const pItemSchema = z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
]);

const permissionSchema = z.object({
    dashboard: pItemSchema,
    clients: pItemSchema,
    orders: pItemSchema,
    calendar: pItemSchema,
    employees: pItemSchema,
    management: pItemSchema,
});

const stateItemSchema = z.union([
    z.literal("SA"),
    z.literal("VIC"),
    z.literal("QLD"),
    z.literal("NSw"),
    z.literal("wa"),
    z.literal("TAS"),
]);

export type Tpermission = z.infer<typeof permissionSchema>;
export type Tstate = z.infer<typeof stateItemSchema>;
