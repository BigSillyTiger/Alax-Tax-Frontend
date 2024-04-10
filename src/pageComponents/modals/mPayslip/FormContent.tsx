import type { ComponentPropsWithoutRef, FC, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useSubmit } from "react-router-dom";
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

type Tprops = ComponentPropsWithoutRef<"main"> & {
    title: string;
};

const FormContent: FC<Tprops> = () => {
    const submit = useSubmit();
    const { t } = useTranslation();
    const [staff] = useAtom(atStaff);
    const currentRouter = useRouterStore((state) => state.currentRouter);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        //const result = await API_ORDER.updateInvoiceIssue(date, oid);
        submit(
            { req: "payslip" },
            {
                method: "POST",
                action: genAction(currentRouter),
            }
        );
    };

    return (
        <Card
            //onSubmit={onSubmit}
            className={`grid grid-cols-1 lg:grid-cols-8 gap-y-3 gap-x-4 overflow-y-auto h-[64dvh] p-2 m-2`}
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
};

export default FormContent;
