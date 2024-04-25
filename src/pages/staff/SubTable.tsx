import type { FC } from "react";
import { PTable } from "@/components/table";
import payslipColumns from "@/configs/columnDefs/defPayslip";
import { TstaffWPayslip } from "@/configs/schema/staffSchema";
import { useAdminStore, usePayslipStore } from "@/configs/zustore";
import { useTranslation } from "react-i18next";
import Card from "@/components/card";
import { ROLES } from "@/configs/utils/staff";

type Tprops = {
    data: TstaffWPayslip;
};

const SubTable: FC<Tprops> = ({ data }) => {
    const { t } = useTranslation();
    const setPayslip = usePayslipStore((state) => state.setPayslip);
    const currentAdmin = useAdminStore((state) => state.currentAdmin);
    const isEmployee = currentAdmin.role === ROLES.employee;

    const newPayslipColumns = isEmployee
        ? payslipColumns.slice(0, -1)
        : payslipColumns;

    return (
        <Card className="m-2">
            {data?.payslips?.length ? (
                <PTable
                    data={data.payslips}
                    setData={setPayslip}
                    columns={newPayslipColumns}
                    menuOptions={{
                        del: true,
                    }}
                    cnHead="bg-indigo-50"
                />
            ) : (
                <div className="my-2 px-1">{t("tips.noPayslips")}</div>
            )}
        </Card>
    );
};
export default SubTable;
