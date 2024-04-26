import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { DateRange } from "react-day-picker";
import { TwlTableRow } from "../schema/workSchema";
import { Tbonus, Tpayslip } from "../schema/payslipSchema";
import { Tdeduction } from "../schema/workSchema";
import { Tstaff } from "../schema/staffSchema";
import { Tcompany } from "../schema/settingSchema";

type Tstate = {
    dayRange: DateRange;
    staffWL: TwlTableRow[];
    // this bonus is for current payslip, used in payslip template
    bonus: Partial<Tbonus>[];
    deduction: Partial<Tdeduction>[];
    payslip: Partial<Tpayslip>;
    // this bonus is for all bonus from bonus table
    allBonus: Tbonus[];
};

type Taction = {
    resetAll: () => void;
    setDayRange: (range: DateRange | undefined) => void;
    setStaffWL: (worklogs: TwlTableRow[]) => void;
    /* payslip */
    setPayslip: (payslip: Partial<Tpayslip>) => void;
    setPayslipDayrange: (from: string, to: string) => void;
    setPayslipStaff: (staff: Tstaff) => void;
    setPayslipCompany: (company: Tcompany) => void;
    setPayslipDate: (date: string) => void;
    setPayslipPSID: (id: string) => void;
    /* bonus */
    setBonus: (bonus: Partial<Tbonus>[]) => void;
    setAllBonus: (bonus: Tbonus[]) => void;
    setBonusAmount: (index: number, amount: number) => void;
    setBonusNote: (index: number, note: string) => void;
    appendBonus: (bonus: Partial<Tbonus>) => void;
    removeBonus: (index: number) => void;
    /* deduction */
    setDeduction: (deductions: Partial<Tdeduction>[]) => void;
};

export const payslipStore = createStore<Tstate & Taction>((set) => ({
    payslip: {},
    dayRange: { from: undefined, to: undefined },
    staffWL: [],
    bonus: [],
    deduction: [],
    allBonus: [],
    resetAll: () => {
        set((state) => ({
            ...state,
            dayRange: { from: undefined, to: undefined },
            staffWL: [],
            bonus: [],
            deduction: [],
        }));
    },

    setDayRange: (range: DateRange | undefined) =>
        set((state) => ({ ...state, dayRange: range })),
    setStaffWL: (worklogs: TwlTableRow[]) =>
        set((state) => ({
            ...state,
            staffWL: worklogs,
        })),
    /* payslip */
    setPayslip: (payslip: Partial<Tpayslip>) =>
        set((state) => ({ ...state, payslip: payslip })),
    setPayslipDayrange: (from: string, to: string) =>
        set((state) => ({ ...state, s_date: from, e_date: to })),
    setPayslipStaff: (staff: Tstaff) =>
        set((state) => ({
            ...state,
            hr: staff.hr,
            staff_name: `${staff.first_name} ${staff.last_name}`,
            staff_addr: staff.address,
            staff_phone: staff.phone,
            staff_email: staff.email,
            staff_bsb: staff.bsb,
            staff_acc: staff.account,
        })),
    setPayslipCompany: (company: Tcompany) =>
        set((state) => ({
            ...state,
            company_name: company.name,
            company_addr: company.address,
            company_phone: company.phone,
        })),
    setPayslipDate: (date: string) => set((state) => ({ ...state, date })),
    setPayslipPSID: (id: string) => set((state) => ({ ...state, psid: id })),
    /* bonus */
    setBonus: (bonus: Partial<Tbonus>[]) =>
        set((state) => ({ ...state, bonus })),
    setAllBonus: (allBonus: Tbonus[]) =>
        set((state) => ({ ...state, allBonus })),
    setBonusAmount: (index: number, amount: number) =>
        set((state) => {
            const newBonus = [...state.bonus];
            newBonus[index] = { ...newBonus[index], amount };
            return { ...state, bonus: newBonus };
        }),
    setBonusNote: (index: number, note: string) =>
        set((state) => {
            const newBonus = [...state.bonus];
            newBonus[index] = { ...newBonus[index], note };
            return { ...state, bonus: newBonus };
        }),
    appendBonus: (bonus: Partial<Tbonus>) =>
        set((state) => ({ ...state, bonus: [...state.bonus, bonus] })),
    removeBonus: (index: number) =>
        set((state) => {
            const newBonus = state.bonus.filter((_, i) => i !== index);
            return { ...state, bonus: newBonus };
        }),
    /* deduction */
    setDeduction: (deductions: Partial<Tdeduction>[]) =>
        set((state) => ({ ...state, deduction: deductions })),
}));

export const usePayslipStore = <T>(selector: (state: Tstate & Taction) => T) =>
    useStore(payslipStore, selector);
