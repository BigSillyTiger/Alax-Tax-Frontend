import { atom } from "jotai";
import {
    TorderService,
    TorderWithClient,
    orderWithClientSchema,
} from "@/configs/schema/orderSchema";
import { orderServiceSchema } from "../schema/orderServiceSchema";

const atOrderWithClient = atom<TorderWithClient>(
    orderWithClientSchema.parse({})
);

const atOrderService = atom<TorderService>(orderServiceSchema.parse({}));

export { atOrderWithClient, atOrderService };
