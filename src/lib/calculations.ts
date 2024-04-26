import Big from "big.js";
import { gstRate } from "@/configs/utils/setting";

export const timesAB = (x: number, y: number): number => {
    const a = new Big(x);
    const b = new Big(y);
    return a.times(b).toNumber();
};

export const divAB = (x: number, y: number): number => {
    const a = new Big(x);
    const b = new Big(y);
    Big.DP = 2;
    return a.div(b).toNumber();
};

export const minusAB = (x: number, y: number): number => {
    const a = new Big(x);
    const b = new Big(y);
    return a.minus(b).toNumber();
};

export const plusAB = (x: number, y: number): number => {
    const a = new Big(x);
    const b = new Big(y);
    return a.plus(b).toNumber();
};

export const calGst = (netto: number): number => {
    const n = new Big(netto);
    const g = new Big(gstRate);
    return n.times(g).round(2).toNumber();
};

export const convertWorkHour = (wh: string): number => {
    const [hours, minutes] = wh.split(":").map(Number);
    return plusAB(hours, divAB(minutes, 60));
};

export const calNetto = (qty: number, price: number): number => {
    const a = new Big(qty);
    const b = new Big(price);
    return a.times(b).round(2).toNumber();
};
