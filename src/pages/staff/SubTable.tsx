import type { FC } from "react";
import { PTable } from "@/components/table";
import usePaySlipColumnsDef from "@/configs/columnDefs/defPayslip";
import { TstaffWPayslip } from "@/configs/schema/staffSchema";
import { useAdminStore, usePayslipStore } from "@/configs/zustore";
import { useTranslation } from "react-i18next";
import { ROLES } from "@/configs/utils/staff";
import SubtableCard from "@/components/table/SubtableCard";
import { ColumnDef } from "@tanstack/react-table";

type Tprops = {
    data: TstaffWPayslip;
};

const SubTable: FC<Tprops> = ({ data }) => {
    const { t } = useTranslation();
    const setPayslip = usePayslipStore((state) => state.setPayslip);
    const currentAdmin = useAdminStore((state) => state.currentAdmin);
    const isEmployee = currentAdmin.role === ROLES.employee;
    const payslipColumns = usePaySlipColumnsDef();
    const newPayslipColumns = isEmployee
        ? payslipColumns.slice(0, -1)
        : payslipColumns;

    return (
        <SubtableCard className="m-2">
            {data?.payslips?.length ? (
                <PTable
                    data={data.payslips}
                    setData={setPayslip}
                    columns={
                        newPayslipColumns as ColumnDef<{
                            psid?: string | undefined;
                            fk_uid?: string | undefined;
                            created_date?: string | undefined;
                            status?: "pending" | "completed" | undefined;
                            hr?: number | undefined;
                            paid?: number | undefined;
                        }>[]
                    }
                    menuOptions={{
                        del: true,
                    }}
                    hFilter={false}
                    cnHead="bg-indigo-50"
                />
            ) : (
                <div className="my-2 px-1">{t("tips.noPayslips")}</div>
            )}
        </SubtableCard>
    );
};
export default SubTable;
