import { atom } from "jotai";
import {
    TorderService,
    Torder,
    orderSchema,
    orderServiceSchema,
} from "@/configs/schema/orderSchema";

const atOrder = atom<Torder>(orderSchema.parse({}));

const atOrderService = atom<TorderService>(orderServiceSchema.parse({}));

export { atOrder, atOrderService };
