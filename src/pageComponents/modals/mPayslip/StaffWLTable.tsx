import type { FC } from "react";
import Card from "@/components/card";
import { PTable } from "@/components/table";
import useStaffWLColumns from "@/configs/columnDefs/defStaffWL";
import { usePayslipStore } from "@/configs/zustore";
import { useTranslation } from "react-i18next";

const StaffWLTable: FC = () => {
    const { t } = useTranslation();
    const staffWL = usePayslipStore((state) => state.staffWL);
    const staffWLColumns = useStaffWLColumns();

    return staffWL.length ? (
        <Card className="mt-2">
            <PTable
                search={false}
                hFilter={false}
                data={staffWL}
                columns={staffWLColumns}
                cnSearch="my-3"
                cnTable={`h-[40dvh]`}
                cnHead="sticky z-10 bg-indigo-300"
                cnTh="py-3"
            />
        </Card>
    ) : (
        <Card className="mt-2">
            <span className="m-5 p-5  text-center h-15">
                {t("label.noContent")}
            </span>
        </Card>
    );
};

export default StaffWLTable;
