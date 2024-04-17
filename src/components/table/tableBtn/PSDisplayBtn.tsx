import { PointerEventHandler, useMemo, type FC } from "react";
import {
    usePayslipStore,
    useStaffStore,
    useStaffWLStore,
} from "@/configs/zustore";
import { Tbonus, Tpayslip } from "@/configs/schema/payslipSchema";
import { useAtom } from "jotai";
import { atModalOpen, atStaff } from "@/configs/atoms";
import { TstaffWPayslip } from "@/configs/schema/staffSchema";
import { auToISO, checkDateRange } from "@/lib/time";
import { mOpenOps } from "@/configs/utils/modal";
import { DocumentIcon } from "@heroicons/react/24/outline";

type Tprops = {
    payslip: Tpayslip;
};

const PSDisplayBtn: FC<Tprops> = ({ payslip }) => {
    const [, setModalOpen] = useAtom(atModalOpen);
    const allStaff = useStaffStore((state) => state.allStaff);
    const [, setStaff] = useAtom(atStaff); // single staff
    const allStaffWL = useStaffWLStore((state) => state.allStaffWL);
    const setPayslip = usePayslipStore((state) => state.setPayslip);
    const allBonus = usePayslipStore((state) => state.allBonus);
    const setStaffWL = usePayslipStore((state) => state.setStaffWL);
    const setDayRange = usePayslipStore((state) => state.setDayRange);
    const setDeduction = usePayslipStore((state) => state.setDeduction);
    const setAllBonus = usePayslipStore((state) => state.setAllBonus);

    /* preparing the data */
    // find the staff that has the specific payslip
    const staff = allStaff.find((staff) => staff.uid === payslip.fk_uid)!;

    const newStaffWL = useMemo(() => {
        return allStaffWL.filter(
            (s) =>
                s.fk_uid === staff.uid &&
                (s.wl_status === "unpaid" || s.wl_status === "completed") &&
                checkDateRange(
                    new Date(payslip.s_date),
                    new Date(payslip.e_date),
                    new Date(auToISO(s.wl_date))
                )
        );
    }, [staff.uid, payslip.s_date, payslip.e_date, allStaffWL]);

    const newDeduct = useMemo(() => {
        return newStaffWL
            .map((wl) => {
                if (wl.deduction) {
                    return wl.deduction;
                }
            })
            .filter((wl) => wl !== undefined)[0];
    }, [newStaffWL]);

    const newBonus = useMemo(() => {
        return allBonus
            .map((bonus) => {
                if (bonus.fk_psid === payslip.psid) {
                    return bonus;
                }
                return null;
            })
            .filter((wl) => wl !== null) as Tbonus[];
    }, [allBonus, payslip.psid]);

    /* setting the data fro pdf template */

    const handleClick: PointerEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        //
        setPayslip(payslip);
        setStaff(staff);
        setStaffWL(newStaffWL);
        // deduction could be undefined
        newDeduct && newDeduct.length && setDeduction(newDeduct);
        newBonus && newBonus.length && setAllBonus(newBonus);
        setDayRange({
            from: new Date(payslip.s_date),
            to: new Date(payslip.e_date),
        });
        //
        setModalOpen(mOpenOps.display);
        // using del_2 because the del is occupied by staff del modal
    };

    return (
        <button onClick={handleClick}>
            <DocumentIcon
                className="h-6 w-6 text-indigo-500"
                aria-hidden="true"
            />
        </button>
    );
};

export default PSDisplayBtn;
