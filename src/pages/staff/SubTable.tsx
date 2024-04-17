import type { FC } from "react";
import { PTable } from "@/components/table";
import payslipColumns from "@/configs/columnDefs/defPayslip";
import { TstaffWPayslip } from "@/configs/schema/staffSchema";
import { usePayslipStore } from "@/configs/zustore";
import { useTranslation } from "react-i18next";

type Tprops = {
    data: TstaffWPayslip;
};

const SubTable: FC<Tprops> = ({ data }) => {
    const { t } = useTranslation();
    const setPayslip = usePayslipStore((state) => state.setPayslip);

    return data?.payslips?.length ? (
        <PTable
            data={data.payslips}
            setData={setPayslip}
            columns={payslipColumns}
            menuOptions={{
                del: true,
            }}
            cnHead="bg-indigo-50"
        />
    ) : (
        <div className="my-2 px-1">{t("tips.noPayslips")}</div>
    );
};
export default SubTable;
