import type { ComponentPropsWithoutRef, FC, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Form, useSubmit, useNavigation } from "react-router-dom";
import { useAtom } from "jotai";
import { genAction } from "@/lib/literals";
import { usePayslipStore, useRouterStore } from "@/configs/zustore";
import { atStaff } from "@/configs/atoms";
import { Toggle } from "@/components/disclosure";
import StaffDetailCard from "@/pageComponents/cards/StaffDetailCard";
import DayPickerContent from "./DayPickerContent";
import StaffWLTable from "./StaffWLTable";
import Card from "@/components/card";
import Bonus from "./Bonus";
import Deduction from "./Deduction";
import { SubmitBtn } from "@/components/form";
import { toastWarning } from "@/lib/toaster";

type Tprops = ComponentPropsWithoutRef<"main"> & {
    title: string;
    onClose: () => void;
};

const FormContent: FC<Tprops> = ({ onClose }) => {
    const submit = useSubmit();
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [staff] = useAtom(atStaff);
    const currentRouter = useRouterStore((state) => state.currentRouter);
    const bonus = usePayslipStore((state) => state.bonus);
    const dayRange = usePayslipStore((state) => state.dayRange);

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
                    s_date: dayRange.from.toISOString(),
                    e_date: dayRange.to.toISOString(),
                }),
            },
            {
                method: "POST",
                action: genAction(currentRouter),
            }
        );
    };

    const Content = () => (
        <Card
            className={`grid grid-cols-1 lg:grid-cols-8 gap-y-3 gap-x-4 overflow-y-auto h-[74dvh] p-2 m-2`}
        >
            <div className="col-span-full">
                <Toggle defaultOpen={true} title={t("label.staffInfo")}>
                    <StaffDetailCard staff={staff} className="" />
                </Toggle>
                <Toggle defaultOpen={true} title={t("label.datePicker")}>
                    <DayPickerContent />
                </Toggle>

                <Toggle defaultOpen={false} title={t("label.confirmedWL")}>
                    <StaffWLTable />
                </Toggle>
                <Toggle defaultOpen={false} title={t("label.bonus")}>
                    <Bonus />
                </Toggle>
                <Toggle
                    defaultOpen={false}
                    title={t("label.deduction")}
                    bColor={"bg-red-100"}
                    hColor={"hover:bg-red-200"}
                    tColor={"text-red-800"}
                >
                    <Deduction />
                </Toggle>
            </div>
        </Card>
    );

    return (
        <Form onSubmit={onSubmit}>
            <Content />

            <SubmitBtn
                onClick={() => {}}
                onClose={onClose}
                navState={navigation.state}
            />

            {/* <SubmitWdlBtn
                onClick={() => {}}
                onClose={onClose}
                navState={navigation.state}
                dlCMP={
                    <PayslipTemplate
                        date={new Date().toISOString()}
                        isDlLink={{
                            isLink: true,
                            pdfTitle: "Payslip-12931239",
                            btnTitle: t("btn.dlPayslip"),
                        }}
                    />
                }
            /> */}
        </Form>
    );
};

export default FormContent;
