import { atom } from "jotai";
import {
    TorderService,
    TorderWithClient,
    orderWithClientSchema,
    orderServiceSchema,
} from "@/configs/schema/orderSchema";

const atOrderWithClient = atom<TorderWithClient>(
    orderWithClientSchema.parse({})
);

const atOrderService = atom<TorderService>(orderServiceSchema.parse({}));

export { atOrderWithClient, atOrderService };
