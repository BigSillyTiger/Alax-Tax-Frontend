import type { ComponentPropsWithoutRef, FC, FormEvent } from "react";
import { useCallback, useEffect, useMemo, memo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation, useSubmit, Form } from "react-router-dom";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { useAtom } from "jotai";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitBtn } from "@/components/form";
import { genAction } from "@/utils/utils";
import { useDayRangeStore, useRouterStore } from "@/configs/zustore";
import { atStaff } from "@/configs/atoms";
import { useStaffWLStore } from "@/configs/zustore/staffWLStore";
import { Toggle } from "@/components/disclosure";
import StaffDetailCard from "@/pageComponents/cards/StaffDetailCard";
import { RangedDayPicker } from "@/pageComponents/DayPicker";
import Card from "@/components/card";
import { PTable } from "@/components/table";
import staffWLColumns from "@/configs/columnDefs/defStaffWL";

type Tprops = ComponentPropsWithoutRef<"main"> & {
    title: string;
};

const FormContent: FC<Tprops> = () => {
    const navigation = useNavigation();
    const submit = useSubmit();
    const { t } = useTranslation();
    const [staff] = useAtom(atStaff);
    const staffWL = useStaffWLStore((state) => state.staffWL);
    const currentRouter = useRouterStore((state) => state.currentRouter);
    const dayRange = useDayRangeStore((state) => state.dayRange);
    const swl = staffWL.filter(
        (s) => s.fk_uid === staff.uid && s.wl_status === "confirmed"
    );

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

    const daypickerContent = (
        <Card className="grid grid-cols-1 lg:grid-cols-8">
            <section className="col-span-full lg:col-span-5 flex justify-center h-auto w-auto">
                <RangedDayPicker />
            </section>
            <section className="col-span-full lg:col-span-3 flex justify-center h-auto w-auto flex-col gap-y-5 text-indigo-600 font-bold">
                {!dayRange?.from && !dayRange?.to && (
                    <p>{t("tips.noSelectedDayRange")}</p>
                )}
                {dayRange?.from && (
                    <>
                        <p className="text-center">
                            {dayRange.from.toDateString()}
                        </p>
                        <p className="mx-auto">~</p>
                    </>
                )}
                {dayRange?.to && (
                    <p className="text-center">{dayRange.to.toDateString()}</p>
                )}
            </section>
        </Card>
    );

    const wlTableContent = swl.length ? (
        <Card className="mt-8">
            <PTable
                search={true}
                hFilter={true}
                data={swl}
                columns={staffWLColumns}
                menuOptions={{
                    edit: true,
                    del: true,
                }}
                //setData={setWorkLog}
                /* getRowCanExpand={(row) => {
                    if (row.original.order_services.length > 0) {
                        return true;
                    }
                    return false;
                }} */
                //expandContent={orderSubTable}
                cnSearch="my-3"
                cnTable={`h-[40dvh]`}
                cnHead="sticky z-10 bg-indigo-300"
                cnTh="py-3"
            />
        </Card>
    ) : (
        <Card className="mt-8">
            <span className="m-5 p-5  text-center h-15">
                {t("label.noContent")}
            </span>
        </Card>
    );

    return (
        <Form
            onSubmit={onSubmit}
            className={`grid grid-cols-1 lg:grid-cols-8 gap-y-3 gap-x-4 overflow-y-auto h-[60dvh] border-2 border-red-400`}
        >
            <section className="col-span-full">
                <Toggle defaultOpen={true} title={t("label.staffInfo")}>
                    <StaffDetailCard staff={staff} className="" />
                </Toggle>
                <Toggle defaultOpen={true} title={t("label.datePicker")}>
                    {daypickerContent}
                </Toggle>

                <Toggle defaultOpen={true} title={t("label.staffWL")}>
                    {wlTableContent}
                </Toggle>
                {/* <Toggle defaultOpen={true} title={t("label.worklogs")}>
                    <></>
                </Toggle> */}
            </section>
        </Form>
    );
};

export default FormContent;
