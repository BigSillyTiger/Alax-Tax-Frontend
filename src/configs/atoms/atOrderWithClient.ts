import { atom } from "jotai";
import {
    TorderWithClient,
    orderWithClientSchema,
} from "@/configs/schema/orderSchema";
import {
    orderServiceSchema,
    TorderService,
} from "../schema/orderServiceSchema";

const atOrderWithClient = atom<TorderWithClient>(
    orderWithClientSchema.parse({})
);

const atOrderService = atom<TorderService>(orderServiceSchema.parse({}));

export { atOrderWithClient, atOrderService };
