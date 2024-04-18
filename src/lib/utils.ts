import { Tpayslip } from "@/configs/schema/payslipSchema";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { globalAlertStore } from "@/configs/zustore";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// for shadcn/ui
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const joinAllValues = (obj: { [key: string]: string }) => {
    return Object.values(obj).join(" ");
};

type Tprops = {
    unPayslip?: Tpayslip[];
    unWorklog?: TwlTableRow[];
};

export const updateBellAlert = ({ unPayslip, unWorklog }: Tprops) => {
    unPayslip && globalAlertStore.getState().setUnPayslip(unPayslip);
    unWorklog && globalAlertStore.getState().setUnWorklog(unWorklog);
};
