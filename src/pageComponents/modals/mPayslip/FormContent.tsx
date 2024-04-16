import type { ComponentPropsWithoutRef, FC } from "react";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { atStaff } from "@/configs/atoms";
import { Toggle } from "@/components/disclosure";
import StaffDetailCard from "@/pageComponents/cards/StaffDetailCard";
import DayPickerContent from "./DayPickerContent";
import StaffWLTable from "./StaffWLTable";
import Card from "@/components/card";
import Bonus from "./Bonus";
import Deduction from "./Deduction";
import PSSubmitBtn from "./PSSubmitBtn";
import { useStaffWLStore } from "@/configs/zustore";
import { Button } from "@/components/ui/button";

type Tprops = ComponentPropsWithoutRef<"main"> & {
    title: string;
    onClose: () => void;
};

const FormContent: FC<Tprops> = ({ onClose }) => {
    const { t } = useTranslation();
    const [staff] = useAtom(atStaff);
    const allStaffWL = useStaffWLStore((state) => state.allStaffWL);
    const wlCount = allStaffWL.filter(
        (log) => log.fk_uid === staff.uid && log.wl_status === "confirmed"
    ).length;

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
        <div>
            {wlCount ? (
                <>
                    <Content />
                    <PSSubmitBtn onClose={onClose} />
                </>
            ) : (
                <div className="flex flex-col justify-center">
                    <Card className="m-2">{t("modal.tips.noAvailableWL")}</Card>
                    <Button
                        name="cancel"
                        type="button"
                        className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset hover:bg-indigo-700"
                        onClick={onClose}
                    >
                        {t("btn.cancel")}
                    </Button>
                </div>
            )}

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
        </div>
    );
};

export default FormContent;
