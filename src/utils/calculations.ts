import Big from "big.js";

const gstPercent = 0.1;

export const timesAB = (x: number, y: number): number => {
    const a = new Big(x);
    const b = new Big(y);
    return a.times(b).toNumber();
};

export const calNetto = (qty: number, price: number): number => {
    const a = new Big(qty);
    const b = new Big(price);
    return a.times(b).toNumber();
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
    const g = new Big(gstPercent);
    return n.times(g).toNumber();
};
