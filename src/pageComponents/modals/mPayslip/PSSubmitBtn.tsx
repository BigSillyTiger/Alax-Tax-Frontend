import {
    type FC,
    type ComponentPropsWithoutRef,
    type FormEvent,
    useMemo,
} from "react";
import { genAction } from "@/lib/literals";
import { usePayslipStore, useRouterStore } from "@/configs/zustore";
import { useTranslation } from "react-i18next";
import { Form, useNavigation, useSubmit } from "react-router-dom";
import { toastWarning } from "@/lib/toaster";
import { SubmitBtn } from "@/components/form";
import { atStaff } from "@/configs/atoms";
import { useAtom } from "jotai";
import { calWorkTime, dateFormat } from "@/lib/time";
import { convertWorkHour, minusAB, plusAB, timesAB } from "@/lib/calculations";

type Tprops = ComponentPropsWithoutRef<"form"> & {
    onClose: () => void;
};

/**
 * @description seperating the bones & dayRange state from the form content
 *              - these state will trigger form content to re-render
 *              - so we need to seperate them to avoid re-rendering the form content
 *              - this component will only render the submit button
 *              - also, since these content are used for submitting the form
 *              - so these states are un-excludable from the submit logic
 * @param
 * @returns
 */
const PSSubmitBtn: FC<Tprops> = ({ onClose }) => {
    const { t } = useTranslation();
    const submit = useSubmit();
    const navigation = useNavigation();
    const [staff] = useAtom(atStaff);
    const currentRouter = useRouterStore((state) => state.currentRouter);
    const bonus = usePayslipStore((state) => state.bonus);
    const staffWL = usePayslipStore((state) => state.staffWL);
    const dayRange = usePayslipStore((state) => state.dayRange);
    const deduction = usePayslipStore((state) => state.deduction);

    const totalPay = useMemo(
        () =>
            staffWL.reduce((accumulator, currentItem) => {
                const workTime = convertWorkHour(
                    calWorkTime(
                        currentItem.s_time,
                        currentItem.e_time,
                        currentItem.b_hour
                    )
                );
                return plusAB(timesAB(workTime, staff.hr), accumulator);
            }, 0),
        [staff.hr, staffWL]
    );

    const totalBonus = useMemo(
        () =>
            bonus && bonus.length
                ? bonus.reduce((accumulator, currentItem) => {
                      return plusAB(
                          currentItem.amount ? currentItem.amount : 0,
                          accumulator
                      );
                  }, 0)
                : 0,
        [bonus]
    );
    const totalDeduct = useMemo(
        () =>
            deduction && deduction.length
                ? deduction.reduce((accumulator, currentItem) => {
                      return plusAB(
                          currentItem.amount ? currentItem.amount : 0,
                          accumulator
                      );
                  }, 0)
                : 0,
        [deduction]
    );

    const paid = plusAB(minusAB(totalPay, totalDeduct), totalBonus);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!dayRange.from || !dayRange.to) {
            toastWarning(t("toastW.selectDayRange"));
            return;
        }
        //const result = await API_ORDER.updateInvoiceIssue(date, oid);
        submit(
            {
                req: "newPayslip",
                bonus: JSON.stringify(bonus),
                payslip: JSON.stringify({
                    fk_uid: staff.uid,
                    status: "pending",
                    hr: staff.hr,
                    s_date: dateFormat(dayRange.from),
                    e_date: dateFormat(dayRange.to),
                    paid,
                }),
            },
            {
                method: "POST",
                action: genAction(currentRouter),
            }
        );
    };

    return (
        <Form onSubmit={onSubmit}>
            <SubmitBtn
                onClick={() => {}}
                onClose={onClose}
                navState={navigation.state}
            />
        </Form>
    );
};

export default PSSubmitBtn;
