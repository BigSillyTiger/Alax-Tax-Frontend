import type { ComponentPropsWithoutRef, FC, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Form, useSubmit, useNavigation } from "react-router-dom";
import { useAtom } from "jotai";
import { genAction } from "@/lib/literals";
import { useRouterStore } from "@/configs/zustore";
import { atStaff } from "@/configs/atoms";
import { Toggle } from "@/components/disclosure";
import StaffDetailCard from "@/pageComponents/cards/StaffDetailCard";
import DayPickerContent from "./DayPickerContent";
import StaffWLTable from "./StaffWLTable";
import Card from "@/components/card";
import Bonus from "./Bonus";
import Deduction from "./Deduction";
import { SubmitBtn } from "@/components/form";

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

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        //const result = await API_ORDER.updateInvoiceIssue(date, oid);
        submit(
            {
                req: "payslip",
                
            },
            {
                method: "POST",
                action: genAction(currentRouter),
            }
        );
    };

    const Content = () => (
        <Card
            //onSubmit={onSubmit}
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
